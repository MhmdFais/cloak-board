require('dotenv').config();
const express = require('express')
const session = require("express-session")
const passport = require("passport")

const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port no ${port}`)
})

