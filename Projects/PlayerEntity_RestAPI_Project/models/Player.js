// MongoDB automatically creates the id
// teamId links player to a team
// Validation rules ensure data consistency

const mongoose = require('mongoose');

// Schema to describe how a player is stored in the database

const playerSchema = new mongoose.Schema({
  // Links the player to a team using the team's ID
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipe',                                      // Reference to the Equipe (team) collection
    required: true,
  },
  name: {                                              // Player's full name
    type: String,
    required: true
  },
  number: {                                           // Jersey number worn by the player
    type: Number,
    required: true
  },
  position: {                                         // Player's position on the field
    type: String,
    required: true
  }
});


// Export the model to allow database operations on players
module.exports = mongoose.model('Player', playerSchema, 'player');
