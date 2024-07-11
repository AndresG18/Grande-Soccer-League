const express = require('express');
const { Tournament, Bracket, Game } = require('../../db/models');
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
        include: [
            {
                model: Bracket,
                include: {
                    model: Game,
                    attributes: ['id', 'homeTeamId', 'awayTeamId', 'gameDate', 'homeTeamScore', 'awayTeamScore']
                },
                attributes: ['id', 'roundNumber']
            }
        ]
    });
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });
    res.json(tournament);
});

// POST new tournament 
router.post('/', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin' ) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { tournamentName, startDate, endDate } = req.body;
    const newTournament = await Tournament.create({ tournamentName, startDate, endDate });
    res.status(201).json(newTournament);
});

// PUT update tournament 
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { tournamentName, startDate, endDate } = req.body;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    if (req.user.type !== 'admin' && req.user.type !== 'coach') {
        return res.status(403).json({ message: "Forbidden" });
    }

    tournament.tournamentName = tournamentName || tournament.tournamentName;
    tournament.startDate = startDate || tournament.startDate;
    tournament.endDate = endDate || tournament.endDate;

    await tournament.save();
    res.json(tournament);
});

// DELETE tournament
router.delete('/:id', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;

    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ "message": "Tournament couldn't be found" });

    await tournament.destroy();
    res.json({ message: "Successfully deleted" });
});

// Brackets routes nested under tournaments

// GET all brackets for a tournament 
router.get('/:id/brackets', async (req, res) => {
    const { id } = req.params;
    const brackets = await Bracket.findAll({
        where: { tournamentId: id },
        include: {
            model: Game,
            attributes: ['id', 'homeTeamId', 'awayTeamId', 'gameDate', 'homeTeamScore', 'awayTeamScore']
        }
    });
    res.json({ brackets });
});

// POST new bracket for a tournament 
router.post('/:id/brackets', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin' ) {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { id } = req.params;
    const { roundNumber, gameId } = req.body;
    const newBracket = await Bracket.create({ tournamentId: id, roundNumber, gameId });
    res.status(201).json(newBracket);
});

// PUT update bracket for a tournament - Accessible only by admins and coaches
router.put('/:tournamentId/brackets/:bracketId', requireAuth, async (req, res) => {
    const { tournamentId, bracketId } = req.params;
    const { roundNumber, gameId } = req.body;

    const bracket = await Bracket.findByPk(bracketId);
    if (!bracket) return res.status(404).json({ "message": "Bracket couldn't be found" });

    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    bracket.roundNumber = roundNumber || bracket.roundNumber;
    bracket.gameId = gameId || bracket.gameId;

    await bracket.save();
    res.json(bracket);
});

// DELETE bracket for a tournament 
router.delete('/:tournamentId/brackets/:bracketId', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { tournamentId, bracketId } = req.params;

    const bracket = await Bracket.findByPk(bracketId);
    if (!bracket) return res.status(404).json({ "message": "Bracket couldn't be found" });

    await bracket.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;