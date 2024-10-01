const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { address, paymentMethod, items } = req.body;

    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const totalAmount = itemsWithDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user.userId,
      items: itemsWithDetails,
      totalAmount,
      address,
      paymentMethod,
    });

    await order.save();

    const user = await User.findById(req.user.userId);
    if (!user.addresses.includes(address)) {
      user.addresses.push(address);
      await user.save();
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

module.exports = router;
