// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js')
const eventRouter = require('./events.js')
const groupImagesRouter = require('./group-images.js')
const eventImagesRouter = require('./event-images.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.use('/groups',groupsRouter);

router.use('/venues',venuesRouter)

router.use('/events',eventRouter)

router.use('/group-images',groupImagesRouter)

router.use('/event-images',eventImagesRouter)

module.exports = router;
