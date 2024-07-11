const express = require('express');
const { TeamStanding, Team } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all team standings
router.get('/', async (req, res) => {
    const teamStandings = await TeamStanding.findAll({
        include: [{ model: Team, attributes: ['id', 'team_name'] }]
    });
    res.json({ teamStandings });
});

// GET team standing by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const teamStanding = await TeamStanding.findByPk(id, {
        include: [{ model: Team, attributes: ['id', 'team_name'] }]
    });
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });
    res.json(teamStanding);
});

// POST new team standing
router.post('/', requireAuth, async (req, res) => {
    const { team_id, games_played, wins, losses, draws, points } = req.body;
    const newTeamStanding = await TeamStanding.create({ team_id, games_played, wins, losses, draws, points });
    res.status(201).json(newTeamStanding);
});

// PUT update team standing
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { team_id, games_played, wins, losses, draws, points } = req.body;

    const teamStanding = await TeamStanding.findByPk(id);
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });

    teamStanding.team_id = team_id;
    teamStanding.games_played = games_played;
    teamStanding.wins = wins;
    teamStanding.losses = losses;
    teamStanding.draws = draws;
    teamStanding.points = points;

    await teamStanding.save();
    res.json(teamStanding);
});

// DELETE team standing
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const teamStanding = await TeamStanding.findByPk(id);
    if (!teamStanding) return res.status(404).json({ "message": "Team standing couldn't be found" });

    await teamStanding.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;