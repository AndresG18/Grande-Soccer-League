const express = require('express');
const { TeamStanding, Team } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all team standings 
router.get('/', async (req, res) => {
    const teamStandings = await TeamStanding.findAll({
        include: [{ model: Team, attributes: ['id', 'teamName'] }]
    });
    res.json({ teamStandings });
});

// GET team standing by ID 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const teamStanding = await TeamStanding.findByPk(id, {
        include: [{ model: Team, attributes: ['id', 'teamName'] }]
    });
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });
    res.json(teamStanding);
});

// POST new team standing
router.post('/', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin' && req.user.type !== 'coach') {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { teamId, gamesPlayed, wins, losses, draws, points } = req.body;
    const newTeamStanding = await TeamStanding.create({ teamId, gamesPlayed, wins, losses, draws, points });
    res.status(201).json(newTeamStanding);
});

// PUT update team standing 
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { teamId, gamesPlayed, wins, losses, draws, points } = req.body;

    const teamStanding = await TeamStanding.findByPk(id);
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });

    if (req.user.type !== 'admin' && req.user.type !== 'coach') {
        return res.status(403).json({ message: "Forbidden" });
    }

    teamStanding.teamId = teamId || teamStanding.teamId;
    teamStanding.gamesPlayed = gamesPlayed || teamStanding.gamesPlayed;
    teamStanding.wins = wins || teamStanding.wins;
    teamStanding.losses = losses || teamStanding.losses;
    teamStanding.draws = draws || teamStanding.draws;
    teamStanding.points = points || teamStanding.points;

    await teamStanding.save();
    res.json(teamStanding);
});

// DELETE team standing 
router.delete('/:id', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;

    const teamStanding = await TeamStanding.findByPk(id);
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });

    await teamStanding.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;