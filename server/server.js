require('dotenv').config();
const express = require('express')
const session = require("express-session")
const passport = require("passport")
const cors = require('cors');
const homeRoute = require('./routes/home')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
const connectToDB = require('./models/db')
const initializePassport = require('./middleware/auth')

const app = express()

initializePassport(passport)

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5174', 
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

app.use(passport.initialize())
app.use(passport.session())

connectToDB();

app.use('/', loginRoute)
app.use('/register', registerRoute)
app.use('/home', homeRoute)

// const checkAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/login');
// };

// app.get('/', checkAuthenticated, (req, res) => {
//     res.redirect('/home');
// });


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port no ${port}`)
})

