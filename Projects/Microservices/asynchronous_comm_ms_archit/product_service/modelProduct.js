const mongoose = require("mongoose"); const ProductSchema = mongoose.Schema({
name: String,
description: String, price: Number, created_at: {
type: Date,
default: Date.now(),
},
});
module.exports = Product = mongoose.model("product", ProductSchema);
41