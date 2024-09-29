require('dotenv').config()
const mongoose = require('mongoose')

let url = `mongodb+srv://mofam534:YyjndPIFHLXtQGrJ@cluster0.wj6ie.mongodb.net/`

const connectToDB = async () => {
    try{
        const connection = await mongoose.connect(url,{
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

