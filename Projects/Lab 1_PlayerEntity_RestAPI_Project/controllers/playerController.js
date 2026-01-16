const Player = require('../models/Player');
const Equipe = require('../models/Equipe');

// Create a new player using team name instead of manually providing teamId
exports.createPlayer = async (req, res) => {
  try {
    const { teamName, name, number, position } = req.body;

    // Find the team dynamically by its name
    const team = await Equipe.findOne({ name: teamName });
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Create player with the proper teamId
    const player = new Player({
      teamId: team._id,
      name,
      number,
      position
    });

    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: "Error creating player", error: err.message });
  }
};

exports.createPlayersBulk = async (req, res) => {
  try {
    const { teamName, players } = req.body; // expect teamName + array of players

    const team = await Equipe.findOne({ name: teamName });
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Add teamId to each player
    const playersWithTeam = players.map(p => ({
      ...p,
      teamId: team._id
    }));

    const result = await Player.insertMany(playersWithTeam);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
};

// Get player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json(player);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Update player
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json(player);
  } catch {
    res.status(400).json({ message: "Invalid ID or data" });
  }
};

// Delete player
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json({ message: "Player deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// List all players on a team
exports.getPlayersByTeam = async (req, res) => {
  const players = await Player.find({ teamId: req.params.teamId });
  res.status(200).json(players);
};

// Get the team of a player
exports.getTeamByPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    const team = await Equipe.findById(player.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json(team);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};



/* Placeholder search by name
exports.searchPlayerByName = async (req, res) => {
  res.status(200).json({ message: "Search functionality coming soon!" });
};

*/

// Placeholder search by name
exports.searchPlayerByName = async (req, res) => {
  const { name } = req.params;
  try {
    const players = await Player.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

