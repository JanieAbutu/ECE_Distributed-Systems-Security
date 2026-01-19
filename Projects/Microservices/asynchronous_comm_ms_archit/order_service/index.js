require('dotenv').config(); // load env variables
const express = require("express"); 
const mongoose = require("mongoose"); 
const axios = require('axios');
const Order = require("./modelOrder"); 
const isAuthenticated = require("./isAuthenticated");
const { connect, sendProductIds } = require('./producer');
const app = express();
const PORT = process.env.PORT_ONE ||4001;
app.use(express.json());

// MongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/order-service")
    .then(() => console.log("Order-Service DB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

//Call connect once
connect()
    .then(() => console.log("RabbitMQ connected (Order-Service)"))
    .catch(err => console.error("RabbitMQ error:", err));

// Calculate the total price of an order by passing a product array as a parameter
function totalPrice(products) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    console.log("Total price: " + total);
    return total;
}
// Route to create a new order
app.post("/order/add", isAuthenticated, async (req, res) => {
    const { ids, user_email } = req.body;

    // //Send product IDs to product-service via RabbitMQ
    await sendProductIds(ids);
    console.log("Order received, product processing started");


    // Save order locally 
    const newOrder = new Order({
        products: ids,
        user_email: user_email,
        total_price: 0, 
    });

    newOrder.save()
        .then(order => res.status(202).json({
            message: "Order received, product processing started",
            order
        }))
        .catch(error => res.status(400).json({ error }));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Order-Service running at port ${PORT}`);
});
