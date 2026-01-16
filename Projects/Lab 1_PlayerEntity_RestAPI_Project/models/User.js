const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// This schema defines how a user is stored in the database
const userSchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },        // User's email address (must be unique)
  password: { type: String, required: true }                   // User's password (will be stored in hashed form)
});

// for automatic hashing
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Export the model to manage users in the database
module.exports = mongoose.model('User', userSchema);
