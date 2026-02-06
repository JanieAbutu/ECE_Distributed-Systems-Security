require('dotenv').config(); // load env variables
const express = require("express"); 
const mongoose = require("mongoose"); 
const axios = require('axios');
const Order = require("./modelOrder"); 
const isAuthenticated = require("./isAuthenticated");

const app = express();
const PORT = process.env.PORT_ONE ||4001;

app.use(express.json());

// MongoDB connection
mongoose.set('strictQuery', true);
//mongoose.connect("mongodb://127.0.0.1:27017/order-service")
mongoose.connect("mongodb://db:27017/order-service")
    .then(() => console.log("Order-Service DB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Calculate the total price of an order by passing a product array as a parameter
function totalPrice(products) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    console.log("Total price: " + total);
    return total;
}

// This function sends an HTTP request to the product service to retrieve the products we want to order (based on their IDs)
async function httpRequest(ids) {
    //const URL = "http://localhost:4000/product/buy";
    const URL = "http://product:4000/product/buy";

    console.log("Sending request to Product-Service at:", new Date().toISOString());

    const response = await axios.post(
        URL,
        { ids },
        { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("Response received from Product-Service at:", new Date().toISOString());

    return totalPrice(response.data);
}


// Route to create a new order
app.post("/order/add", isAuthenticated, async (req, res) => {
    const { ids, user_email } = req.body;

    console.log("Order creation started at:", new Date().toISOString());

    try {
        const total = await httpRequest(ids);

        console.log("Total received, saving order at:", new Date().toISOString());

        const newOrder = new Order({
            products: ids,
            user_email,
            total_price: total,
        });git 

        const savedOrder = await newOrder.save();

        console.log("Order saved at:", new Date().toISOString());

        res.status(201).json(savedOrder);

    } catch (error) {
        console.error("Order creation failed at:", new Date().toISOString());

        res.status(503).json({
            error: "Product Service unavailable. Order not created."
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Order-Service running at port ${PORT}`);
});
