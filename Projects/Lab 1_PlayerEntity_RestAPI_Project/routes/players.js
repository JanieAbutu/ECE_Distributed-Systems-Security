const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const playerController = require('../controllers/playerController');

// CRUD routes for players: private APIs must have the middleware-auth for protection(access only)
router.get('/', auth, playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/bulk', auth, playerController.createPlayersBulk);
router.post('/', auth, playerController.createPlayer);
router.put('/:id', auth, playerController.updatePlayer);
router.delete('/:id', auth, playerController.deletePlayer);

// Special routes
router.get('/team/:teamId', playerController.getPlayersByTeam);
router.get('/:id/team', playerController.getTeamByPlayer);
router.get('/search/:name', playerController.searchPlayerByName);

module.exports = router;
