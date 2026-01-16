const express = require('express');
const app = express();

// Middleware
app.use(express.json())

// Bring (load/import) in the code from equipes.js so I can use it here.
const equipes = require('./equipes.js');

// using mongodb for data source instead
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/teamsdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));



app.listen(82, () => {
  console.log(`REST API via ExpressJS`);
});


/////////////
// REST API Endpoints = Resources + HTTP methods + URLs
/////////////////

// To GET route /teams(listen for a url, send the response, get all teams)
app.get('/equipes', (req,res) => {
    //res.send("Liste des Equipes") // outputs/sends message - Liste des Equipes
    res.status(200).json(equipes)   // outputs the content of equipes in json format
});

// GET route /teams/:id - Get team by ID
app.get('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(e=> e.id === id)
    res.status(200).json(equipe)   // outputs the content of equipes in json format
});

// post 
app.post('/equipes', (req,res) => {
    equipes.push(req.body)
    res.status(200).json(equipes)   // outputs the content of equipes in json format
});

// update
app.put('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let equipe = equipes.find(e=> e.id === id)
    equipe.name =req.body.name,
    equipe.country=req.body.country,
    res.status(200).json(equipe)   // outputs the content of equipes in json format
});

// delete
app.delete('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let equipe = equipes.find(e=> e.id === id)
    equipes.splice(equipes.indexOf(equipe),1)
    res.status(200).json(equipes)   // outputs the content of equipes in json format
});