const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const equipeRoutes = require('./routes/Equipe');
const playerRoutes = require('./routes/players');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/teamsdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/equipes', equipeRoutes);
app.use('/players', playerRoutes);
app.use('/auth', authRoutes);

app.listen(82, () => console.log('REST API via ExpressJS on port 82'));
