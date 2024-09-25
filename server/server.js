require('dotenv').config();
const express = require('express')
const session = require("express-session")
const passport = require("passport")
const cors = require('cors');

const app = express()

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',  
    credentials: true,  
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.session())


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port no ${port}`)
})

