const express = require('express');
const { Tournament, Bracket } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all tournaments
router.get('/', async (req, res) => {
    const tournaments = await Tournament.findAll();
    res.json({ tournaments });
});

// GET tournament by ID
router.get('/:tournamentId', async (req, res) => {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findByPk(tournamentId, {
        include: [{ model: Bracket, attributes: ['id', 'round_number', 'game_id'] }]
    });
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });
    res.json(tournament);
});

// POST new tournament
router.post('/', requireAuth, async (req, res) => {
    const { tournament_name, start_date, end_date } = req.body;
    const newTournament = await Tournament.create({ tournament_name, start_date, end_date });
    res.status(201).json(newTournament);
});

// PUT update tournament
router.put('/:tournamentId', requireAuth, async (req, res) => {
    const { tournamentId } = req.params;
    const { tournament_name, start_date, end_date } = req.body;

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    tournament.tournament_name = tournament_name;
    tournament.start_date = start_date;
    tournament.end_date = end_date;

    await tournament.save();
    res.json(tournament);
});

// DELETE tournament
router.delete('/:tournamentId', requireAuth, async (req, res) => {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    await tournament.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;