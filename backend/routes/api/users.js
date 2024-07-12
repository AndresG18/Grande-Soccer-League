const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Team } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email').isEmail().withMessage('Invalid email'),
    check('firstName')
        .isString()
        .withMessage("First Name is required")
        .isLength({ min: 2 })
        .withMessage("First Name is required"),
    check('lastName')
        .isString()
        .withMessage("Last Name is required")
        .isLength({ min: 2 })
        .withMessage("Last Name is required"),
    // check('phone')
    //     .isString()
    //     .withMessage("Phone number is required")
    //     .isLength({ min: 10 })
    //     .withMessage("Phone number is required"),
    // check('type')
    //     .isIn(['admin', 'coach', 'player'])
    //     .withMessage("Type must be 'admin', 'coach', or 'player'"),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, phone, type, teamId } = req.body;
    console.log(req.body)
    const checkingEmail = await User.findAll({
        where: { email: email }
    });

    if (checkingEmail.length > 0) return res.status(500).json({
        "message": "User already exists",
        "errors": { "email": "User with that email already exists" }
    });

    const hashedPassword = bcrypt.hashSync(password);

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        hashedPassword,
        type,
        teamId
    });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
});

// GET all users
router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [{ model: Team, as: 'Team', attributes: ['id', 'teamName'] }]
    });
    res.json({ users });
});

// GET user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
        include: [{ model: Team, as: 'Team', attributes: ['id', 'teamName'] }]
    });
    if (!user) return res.status(404).json({ "message": "User couldn't be found" });
    res.json(user);
});

// PUT update user
router.put('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, type, teamId ,goals,assists} = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ "message": "User couldn't be found" });

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.type = type ?? user.type;
    user.teamId = teamId ?? user.teamId;
    user.goals = goals ?? user.goals;
    user.assists = assists ?? user.goals;
 
    await user.save();
    res.json(user);
});

// DELETE user
router.delete('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ "message": "User couldn't be found" });

    await user.destroy();
    res.json({ message: "Successfully deleted" });
});

module.exports = router;
// Route to register a child
router.post('/:coachId/children', checkCoach, async (req, res) => {
    const { coachId } = req.params;
    const { firstName, lastName, age } = req.body;
  
    try {
      const coach = await User.findByPk(coachId);
  
      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
  
      const newChild = await Child.create({
        firstName,
        lastName,
        age,
        coachId: coach.id,
      });
  
      return res.status(201).json(newChild);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  // Route to get all children for a specific coach
  router.get('/:coachId/children', checkCoach, async (req, res) => {
    const { coachId } = req.params;
  
    try {
      const children = await Child.findAll({
        where: { coachId },
      });
  
      return res.status(200).json(children);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  // Route to delete a specific child
  router.delete('/children/:childId', checkCoach, async (req, res) => {
    const { childId } = req.params;
  
    try {
      const child = await Child.findByPk(childId);
  
      if (!child) {
        return res.status(404).json({ message: 'Child not found' });
      }
  
      await child.destroy();
  
      return res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;