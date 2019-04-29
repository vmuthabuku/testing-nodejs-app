const express = require('express');
const router = express.Router();
const todosController = require("../controllers/todo.js")

/* GET home page. */
module.exports = (app)=> {
  app.get('/api',(req,res) => res.status(200).send({
    message:'Welcome to the Todos API!',
}));
  app.post('/api/todos',todosController.create);
  app.get('/api/todos',todosController.allTodos);
  app.get('/api/todo', todosController.oneTodo)
  app.put('/api/todoUpdate',todosController.updateTodo)
  app.delete('/api/todoDelete', todosController.deleteTodo)
  


}


