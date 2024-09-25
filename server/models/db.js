require('dotenv').config();

let dbPass = process.env.DB_PASS

let url = `mongodb+srv://mofam534:${dbPass}.wj6ie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`