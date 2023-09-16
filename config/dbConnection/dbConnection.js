const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async()=>{
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Specify SSL options
        ssl: true
      };
    try{
        const response = await mongoose.connect(process.env.CONNECTION_STRING,mongooseOptions);
        console.log("db is successfully connected");
    }catch(e){
        console.log("Error : ",e);
    }
}

module.exports = connectDb;

