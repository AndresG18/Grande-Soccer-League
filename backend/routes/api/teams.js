const express = require('express');
const { Team, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all teams 
router.get('/', async (req, res) => {
    const teams = await Team.findAll({
        include: [{ model: User, as: 'Players', attributes: ['id', 'firstName', 'lastName'] }]
    });
    res.json({ teams });
});

// GET team by ID 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByPk(id, {
        include: [
            { model: User, as: 'Coach', attributes: ['id', 'firstName', 'lastName'] },
            { model: User, as: 'Players', attributes: ['id', 'firstName', 'lastName'] }
        ]
    });
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });
    res.json(team);
});

// POST new team 
router.post('/', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin' && req.user.type !== 'coach') {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { teamName, coachId, homeArena } = req.body;
    const newTeam = await Team.create({ teamName, coachId, homeArena });
    res.status(201).json(newTeam);
});

// PUT update team 
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { teamName, coachId, homeArena } = req.body;

    const team = await Team.findByPk(id);
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });

    if (req.user.type !== 'admin' && req.user.id !== team.coachId) {
        return res.status(403).json({ message: "Forbidden" });
    }

    team.teamName = teamName || team.teamName;
    team.coachId = coachId || team.coachId;
    team.homeArena = homeArena || team.homeArena;

    await team.save();
    res.json(team);
});

// DELETE team 
router.delete('/:id', requireAuth, async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }
a
    const { id } = req.params;

    const team = await Team.findByPk(id);
    if (!team) return res.status(404).json({ "message": "Team couldn't be found" });

    await team.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;