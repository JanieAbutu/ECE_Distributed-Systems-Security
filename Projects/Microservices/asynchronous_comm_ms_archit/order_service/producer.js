const amqp = require("amqplib");
let channel;
let connection;

async function connect() {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();
    await channel.assertQueue("product_queue");
}

async function sendProductIds(ids) {
    channel.sendToQueue(
        "product_queue",
        Buffer.from(JSON.stringify({ ids }))
    );
}

async function close() {
    await channel.close();
    await connection.close();
}

module.exports = { connect, sendProductIds, close };
