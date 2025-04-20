const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createUser". no login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
        }

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(201).json({ success: true, user });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some errer occurred");
    }
    res.json(User);
});

module.exports = router;