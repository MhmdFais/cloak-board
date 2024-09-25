require('dotenv').config();
const express = require('express')
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port no ${port}`)
})

