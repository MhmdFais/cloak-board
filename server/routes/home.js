const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome, ${req.user.firstname}!`);
    } else {
        res.redirect('/login');
    }
});

module.exports = router;

