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
router.get('/:gameId', async (req, res) => {
    const { gameId } = req.params;
    const game = await Game.findByPk(gameId, {
        include: [
            { model: Team, as: 'HomeTeam', attributes: ['id', 'team_name'] },
            { model: Team, as: 'AwayTeam', attributes: ['id', 'team_name'] }
        ]
    });
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });
    res.json(game);
});

// POST new game
router.post('/', requireAuth, async (req, res) => {
    const { home_team_id, away_team_id, game_date, home_team_score, away_team_score, venue } = req.body;
    const newGame = await Game.create({ home_team_id, away_team_id, game_date, home_team_score, away_team_score, venue });
    res.status(201).json(newGame);
});

// PUT update game
router.put('/:gameId', requireAuth, async (req, res) => {
    const { gameId } = req.params;
    const { home_team_id, away_team_id, game_date, home_team_score, away_team_score, venue } = req.body;

    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });

    game.home_team_id = home_team_id;
    game.away_team_id = away_team_id;
    game.game_date = game_date;
    game.home_team_score = home_team_score;
    game.away_team_score = away_team_score;
    game.venue = venue;

    await game.save();
    res.json(game);
});

// DELETE game
router.delete('/:gameId', requireAuth, async (req, res) => {
    const { gameId } = req.params;

    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ "message": "Game couldn't be found" });

    await game.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;