const express = require('express');
const { Game, Team } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all games 
router.get('/', async (req, res) => {
    const games = await Game.findAll();
    res.json({ games });
});

// GET game by ID 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByPk(id, {
        include: [
            { model: Team, as: 'HomeTeam', attributes: ['id', 'teamName'] },
            { model: Team, as: 'AwayTeam', attributes: ['id', 'teamName'] }
        ]
    });
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });
    res.json(game);
});

// POST new game 
router.post('/', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { homeTeamId, awayTeamId, gameDate, homeTeamScore, awayTeamScore, venue } = req.body;
    const newGame = await Game.create({ homeTeamId, awayTeamId, gameDate, homeTeamScore, awayTeamScore, venue });
    res.status(201).json(newGame);
});

// PUT update game 
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { homeTeamId, awayTeamId, gameDate, homeTeamScore, awayTeamScore, venue } = req.body;

    const game = await Game.findByPk(id);
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });

    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    game.homeTeamId = homeTeamId || game.homeTeamId;
    game.awayTeamId = awayTeamId || game.awayTeamId;
    game.gameDate = gameDate || game.gameDate;
    game.homeTeamScore = homeTeamScore || game.homeTeamScore;
    game.awayTeamScore = awayTeamScore || game.awayTeamScore;
    game.venue = venue || game.venue;

    await game.save();
    res.json(game);
});

// DELETE game 
router.delete('/:id', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;

    const game = await Game.findByPk(id);
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });

    await game.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;