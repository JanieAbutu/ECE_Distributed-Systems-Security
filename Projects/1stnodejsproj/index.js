const express = require('express');
const mongoose = require('mongoose');
const Equipe = require('./models/Equipe'); // the model
const jwt = require('jsonwebtoken'); //jwt authentication token
const app = express();

// Middleware
app.use(express.json()); // for parsing JSON in POST/PUT

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bdmonapi')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// LIST all teams
app.get('/equipes', async (req, res) => {
  const equipes = await Equipe.find();
  res.status(200).json(equipes);
});

// GET a team by ID
app.get('/equipes/:id', async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(equipe);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// CREATE a new team
app.post('/equipes', async (req, res) => {
  const { name, country } = req.body;
  const equipe = new Equipe({ name, country });
  await equipe.save();
  res.status(201).json(equipe);
});

// UPDATE a team
app.put('/equipes/:id', async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(equipe);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID or data" });
  }
});

// DELETE a team
app.delete('/equipes/:id', async (req, res) => {
  try {
    const equipe = await Equipe.findByIdAndDelete(req.params.id);
    if (!equipe) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.listen(82, () => {
  console.log('REST API via ExpressJS on port 82');
});

