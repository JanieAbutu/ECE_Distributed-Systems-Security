const express = require('express');
const router = express.Router();
const equipeController = require('../controllers/Equipe');

// CRUD routes for equipe
router.get('/', equipeController.getAllEquipes);
router.get('/:id', equipeController.getEquipeById);
router.post('/', equipeController.createEquipe);
router.put('/:id', equipeController.updateEquipe);
router.delete('/:id', equipeController.deleteEquipe);

module.exports = router;
