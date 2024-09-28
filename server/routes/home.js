const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome, ${req.user.firstname}!`);
    } else {
        res.redirect('/login');
    }
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
    });
})

module.exports = router;

