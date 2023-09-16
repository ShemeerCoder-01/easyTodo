const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todo = new Schema({
    taskName:{
        type:String,
        require:true
    },
    priority:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('todos',todo);