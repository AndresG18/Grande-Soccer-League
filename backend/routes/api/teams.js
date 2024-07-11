const express = require('express');
const { Team, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all teams
router.get('/', async (req, res) => {
    const teams = await Team.findAll();
    res.json({ teams });
});

// GET team by ID
router.get('/:teamId', async (req, res) => {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId, {
        include: [{ model: User, as: 'Coach', attributes: ['id', 'first_name', 'last_name'] }]
    });
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });
    res.json(team);
});

// POST new team
router.post('/', requireAuth, async (req, res) => {
    const { team_name, coach_id, home_arena } = req.body;
    const newTeam = await Team.create({ team_name, coach_id, home_arena });
    res.status(201).json(newTeam);
});

// PUT update team
router.put('/:teamId', requireAuth, async (req, res) => {
    const { teamId } = req.params;
    const { team_name, coach_id, home_arena } = req.body;

    const team = await Team.findByPk(teamId);
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });

    team.team_name = team_name;
    team.coach_id = coach_id;
    team.home_arena = home_arena;

    await team.save();
    res.json(team);
});

// DELETE team
router.delete('/:teamId', requireAuth, async (req, res) => {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });

    await team.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;