const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login error' });
            }
            return res.redirect('/home');
        });
    })(req, res, next);
});



module.exports = router;
