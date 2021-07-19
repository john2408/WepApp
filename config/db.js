require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_DB_URI, {
            auth: {
              user: process.env.MONGO_DB_USER,
              password: process.env.MONGO_DB_PASSWORD
            },
             useNewUrlParser: true , 
             useUnifiedTopology : true
          });

        console.log("Mongo DB connection SUCCESS");
        
    } catch (error) {

        console.error("Mongo DB connection FAIL");
        process.exit(1)

    }
}

module.exports = connectDB;