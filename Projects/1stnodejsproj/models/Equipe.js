// Create a Model (replace equipes.js) - defines structure only, not data

const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true }
});

module.exports = mongoose.model('Equipe', equipeSchema, 'equipe');
// equipe - collection name