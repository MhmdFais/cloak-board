const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        try{
            const messages = await Message.find({ email: req.user.email });
            res.json(messages);
        }
        catch(error){
            console.error(error);
            res.status(500).send('Server Error');
        }
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

router.post('/message', ensureAuthenticated, async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        const newMessage = new Message({
            email: req.user.email,
            message,
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

