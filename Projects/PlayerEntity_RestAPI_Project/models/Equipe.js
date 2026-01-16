const mongoose = require('mongoose');

// This defines the structure of a team (équipe) in the database
// Each team must have a name and a country
const equipeSchema = new mongoose.Schema({
  name: { type: String, required: true },     // Team name (required)
  country: { type: String, required: true }   // Country the team belongs to (required)
});

// Export the model so it can be used to create, read, update, and delete teams
module.exports = mongoose.model('Equipe', equipeSchema, 'equipe');
