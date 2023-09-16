const Joi = require('joi');
const todo = require('../models/todoModel');

const addTodo = async(req,res)=>{
    const {taskName,priority,date,email} = req.body;
    const isValid = Joi.object({
        taskName: Joi.string().max(12).required(),
        priority:Joi.string().required(),
        date:Joi.string().required(),
        email:Joi.string().email().required()
    }).validate({taskName,priority,date,email});
    if(isValid.error){
        return res.status(400).send({
            status:400,
            data:isValid.error
        })
    }
    const todoObj = new todo({
        taskName,
        priority,
        date,
        email
    });
    await todoObj.save();
    const todoArr = await todo.find({email:email});
    res.status(201).send({status:"201",Message:"Todo is successfully added",data:todoArr});
};

const getAllTodos = async(req,res)=>{   
    const userEmail = req.query.email;
    const todos = await todo.find({email:userEmail});
    res.status(200).send({data:todos});
};

const deleteATodo = async(req,res)=>{
    const todoid = req.query.todoid;
    const userEmail = req.query.email
    await todo.findByIdAndDelete(todoid);
    const todoArr = await todo.find({email:userEmail});
    res.status(200).send({status:"200",Message:'Todo is successfully deleted',data:todoArr});
};

const updateATodo = async(req,res)=>{
    const {_id,...updatedbody} = req.body;
    const email = req.query.userEmail;
    const response = await todo.findByIdAndUpdate(_id,updatedbody);
    const todoArr = await todo.find({email:email}).sort({updatedAt:1});
    res.status(200).send({status:"200",Message:"Todo is Successfully updated", data:todoArr});
}

module.exports = {addTodo,getAllTodos,deleteATodo,updateATodo};