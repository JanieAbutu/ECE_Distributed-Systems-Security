const amqp = require("amqplib");
const Product = require("./modelProduct");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/product-service")
  .then(() => console.log("MongoDB connected in consumer"))
  .catch(err => console.error("MongoDB connection error:", err));


// Function to connect to RabbitMQ and consume messages
async function connect() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const queue = "product_queue";

    await channel.assertQueue(queue);

    // Informational logs before starting to consume messages
    console.log("Before consuming messages");
    console.log("Waiting for messages in product_queue...");

    // Set up a consumer to listen for messages from the queue
    channel.consume(queue, async (msg) => {
        console.log("Message received, querying database...");
        const { ids } = JSON.parse(msg.content.toString());

        const products = await Product.find({
            _id: { $in: ids }
        });

        console.log("Database response received:", products);
        channel.ack(msg);
    });

    console.log("Noving on, working on other things!!");
}

connect();
