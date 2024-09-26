const express = require('express');
const User = require('../controller/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({
            firstname,
            lastname,
            email,
            password,
        });

        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
