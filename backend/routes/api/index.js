const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const teamsRouter = require('./teams.js');
const gamesRouter = require('./games.js');
const teamStandingsRouter = require('./team-standings.js');
const tournamentsRouter = require('./tournaments.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/teams', teamsRouter);
router.use('/games', gamesRouter);
router.use('/team-standings', teamStandingsRouter);
router.use('/tournaments', tournamentsRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;