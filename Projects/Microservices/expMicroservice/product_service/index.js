require('dotenv').config(); // load env variables

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./modelProduct");


const app = express();
const PORT = process.env.PORT_ONE || 4000;

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/product-service")
  .then(() => {
    console.log("Product-Service DB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  
// Routes
app.post("/product/add", (req, res) => {
  const { name, description, price } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
  });

  newProduct.save()
    .then(product => res.status(201).json(product))
    .catch(error => res.status(400).json({ error }));
});

app.get("/product/buy", (req, res) => {
  const { ids } = req.body;

  Product.find({ _id: { $in: ids } })
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
});

// For your Order Service, which sends JSON
app.post("/product/buy", (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "ids array is required in body" });
  }

  console.log("Received request in Product-Service at:", new Date().toISOString());

  // Artificial delay to simulate processing
  setTimeout(() => {

  Product.find({ _id: { $in: ids } })
    .then(products => {
      console.log("Responding with products at:", new Date().toISOString());
      res.status(200).json(products)
  })
     
    .catch(error => res.status(400).json({ error }));
  }, 10000); // 5-second delay
});


// Start server
app.listen(PORT, () => {
  console.log(`Product-Service running on port ${PORT}`);
});
