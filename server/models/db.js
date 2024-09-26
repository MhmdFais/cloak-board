require('dotenv').config()
const mongoose = require('mongoose')

//let dbPass = process.env.DB_PASS

//let url = `mongodb+srv://mofam534:${dbPass}.wj6ie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToDB = async () => {
    try{
        const connection = await mongoose.connect('mongodb://localhost:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectToDB

