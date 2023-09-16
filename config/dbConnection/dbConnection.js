const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async()=>{
    try{
        const response = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db is successfully connected");
    }catch(e){
        console.log("Error : ",e);
    }
}

module.exports = connectDb;

