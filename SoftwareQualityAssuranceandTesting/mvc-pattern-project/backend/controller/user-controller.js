const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

// Create a user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(201).json(user);
        console.log("User created");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
