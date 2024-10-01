require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const sampleProducts = [
  {
    name: "Basic T-shirt",
    description: "Comfortable cotton T-shirt in various colors.",
    price: 350,
    image: "https://via.placeholder.com/300x300?text=Basic+T-shirt",
    category: "Clothes for Men",
  },
  {
    name: "Graphic T-shirt",
    description: "Trendy graphic T-shirt for casual wear.",
    price: 450,
    image: "https://via.placeholder.com/300x300?text=Graphic+T-shirt",
    category: "Clothes for Men",
  },
  {
    name: "Slim Fit T-shirt",
    description: "Stylish slim fit T-shirt for a modern look.",
    price: 500,
    image: "https://via.placeholder.com/300x300?text=Slim+Fit+T-shirt",
    category: "Clothes for Men",
  },
  {
    name: "V-neck T-shirt",
    description: "Soft V-neck T-shirt with a comfortable fit.",
    price: 600,
    image: "https://via.placeholder.com/300x300?text=V-neck+T-shirt",
    category: "Clothes for Men",
  },
  {
    name: "Plain T-shirt",
    description: "Minimalist plain T-shirt, perfect for layering.",
    price: 700,
    image: "https://via.placeholder.com/300x300?text=Plain+T-shirt",
    category: "Clothes for Men",
  },

  {
    name: "Classic Polo T-shirt",
    description: "Timeless polo T-shirt with collar and button placket.",
    price: 600,
    image: "https://via.placeholder.com/300x300?text=Classic+Polo",
    category: "Clothes for Men",
  },
  {
    name: "Striped Polo T-shirt",
    description: "Casual striped polo T-shirt for everyday wear.",
    price: 750,
    image: "https://via.placeholder.com/300x300?text=Striped+Polo",
    category: "Clothes for Men",
  },
  {
    name: "Slim Fit Polo T-shirt",
    description: "Modern slim fit polo with soft fabric.",
    price: 950,
    image: "https://via.placeholder.com/300x300?text=Slim+Fit+Polo",
    category: "Clothes for Men",
  },
  {
    name: "Sport Polo T-shirt",
    description: "Performance polo T-shirt for active lifestyles.",
    price: 1050,
    image: "https://via.placeholder.com/300x300?text=Sport+Polo",
    category: "Clothes for Men",
  },
  {
    name: "Printed Polo T-shirt",
    description: "Trendy printed polo T-shirt for a casual outing.",
    price: 1100,
    image: "https://via.placeholder.com/300x300?text=Printed+Polo",
    category: "Clothes for Men",
  },

  {
    name: "Regular Fit Jeans",
    description: "Classic regular fit jeans for everyday wear.",
    price: 900,
    image: "https://via.placeholder.com/300x300?text=Regular+Fit+Jeans",
    category: "Clothes for Men",
  },
  {
    name: "Slim Fit Jeans",
    description: "Stylish slim fit jeans with stretch for comfort.",
    price: 1200,
    image: "https://via.placeholder.com/300x300?text=Slim+Fit+Jeans",
    category: "Clothes for Men",
  },
  {
    name: "Distressed Jeans",
    description: "Trendy distressed jeans for a rugged look.",
    price: 1500,
    image: "https://via.placeholder.com/300x300?text=Distressed+Jeans",
    category: "Clothes for Men",
  },
  {
    name: "Straight Fit Jeans",
    description: "Versatile straight fit jeans for any occasion.",
    price: 1800,
    image: "https://via.placeholder.com/300x300?text=Straight+Fit+Jeans",
    category: "Clothes for Men",
  },
  {
    name: "Skinny Fit Jeans",
    description: "Modern skinny fit jeans with stretch fabric.",
    price: 2000,
    image: "https://via.placeholder.com/300x300?text=Skinny+Fit+Jeans",
    category: "Clothes for Men",
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      await Product.deleteMany({});
      console.log("Cleared existing products");

      const insertedProducts = await Product.insertMany(sampleProducts);
      console.log(`Inserted ${insertedProducts.length} products`);

      console.log("Sample products added successfully");
    } catch (error) {
      console.error("Error adding sample products:", error);
    } finally {
      mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
