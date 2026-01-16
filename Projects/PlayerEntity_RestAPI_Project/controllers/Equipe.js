const Equipe = require('../models/Equipe');

// Get all teams
exports.getAllEquipes = async (req, res) => {
  const equipes = await Equipe.find();
  res.status(200).json(equipes);
};

// Get team by ID
exports.getEquipeById = async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(equipe);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Create a new team
exports.createEquipe = async (req, res) => {
  const { name, country } = req.body;
  const equipe = new Equipe({ name, country });
  await equipe.save();
  res.status(201).json(equipe);
};

// Update team
exports.updateEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(equipe);
  } catch {
    res.status(400).json({ message: "Invalid ID or data" });
  }
};

// Delete team
exports.deleteEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndDelete(req.params.id);
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted" });
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};
