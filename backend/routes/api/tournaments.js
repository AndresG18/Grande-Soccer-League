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
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tournament = await Tournament.findByPk(id, {
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
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { tournament_name, start_date, end_date } = req.body;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    tournament.tournament_name = tournament_name;
    tournament.start_date = start_date;
    tournament.end_date = end_date;

    await tournament.save();
    res.json(tournament);
});

// DELETE tournament
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    await tournament.destroy();
    res.json({ message: "Successfully deleted" });
});

// GET all brackets for a tournament
router.get('/:id/brackets', async (req, res) => {
    const { id } = req.params;
    const brackets = await Bracket.findAll({ where: { tournament_id: id } });
    if (!brackets) return res.status(404).json({ "message": "Brackets couldn't be found" });
    res.json({ brackets });
});

// POST new bracket for a tournament
router.post('/:id/brackets', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { round_number, game_id } = req.body;
    const newBracket = await Bracket.create({ tournament_id: id, round_number, game_id });
    res.status(201).json(newBracket);
});

// PUT update bracket
router.put('/:tournamentId/brackets/:bracketId', requireAuth, async (req, res) => {
    const { tournamentId, bracketId } = req.params;
    const { round_number, game_id } = req.body;

    const bracket = await Bracket.findByPk(bracketId);
    if (!bracket) return res.status(404).json({ "message": "Bracket couldn't be found" });

    bracket.round_number = round_number;
    bracket.game_id = game_id;

    await bracket.save();
    res.json(bracket);
});

// DELETE bracket
router.delete('/:tournamentId/brackets/:bracketId', requireAuth, async (req, res) => {
    const { bracketId } = req.params;

    const bracket = await Bracket.findByPk(bracketId);
    if (!bracket) return res.status(404).json({ "message": "Bracket couldn't be found" });

    await bracket.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;