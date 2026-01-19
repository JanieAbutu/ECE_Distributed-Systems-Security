const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    products: {
        type: [String]
    },
    user_email: String, 
    total_price: Number, 
    created_at: {
        type: Date, default: 
        Date.now(),
    },
});

module.exports = Order = mongoose.model("order", OrderSchema);