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
    check('phone')
        .isString()
        .withMessage("Phone number is required")
        .isLength({ min: 10 })
        .withMessage("Phone number is required"),
    check('type')
        .isIn(['admin', 'coach', 'player'])
        .withMessage("Type must be 'admin', 'coach', or 'player'"),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, phone, type, teamId } = req.body;

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