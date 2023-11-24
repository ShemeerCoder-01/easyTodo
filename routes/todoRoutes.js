const express = require('express');
const router = express.Router();
const { addTodo, getAllTodos, deleteATodo, updateATodo } = require('../controllers/todoController');

//@desc add a todo
//@method POST 
//@ route /todo/addTodo
router.post('/addTodo',addTodo);

//@desc get all todos
//@method GET
//@ route /todo/todos
router.get('/todos',getAllTodos);

//@desc delete a todo
//@method DELETE
//@ route /todo/todos/:todoid
router.delete('/todos/',deleteATodo);

//@desc update a todo
//@method PUT
//@ route /todo/todos
router.put('/todos',updateATodo);

module.exports = router;