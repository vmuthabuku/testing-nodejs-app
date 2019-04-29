const Todo = require("../models.js/todo").Todo

module.exports = {
    create(req, res) {
        const todo = new Todo(req.body)

        todo.save((err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(201).json({
                Message: "Created Successfully",
                todoId: doc._id
            })    
        })
    },
    allTodos(req,res){    
        Todo.find({},(err,data)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({
                Message:"All lists retrieved successfully",
                allTodos:data
            })
        })
    
    },
    oneTodo(req,res) {
        const id = req.query.id
        Todo.findById(id,(err,data) => {
            if(err) return res.status(404).send(err)
            res.status(200).json({
                Message:`todo with id ${id} found`,
                Todo:data
            })
        })
    },
    updateTodo(req,res) {
        Todo.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,data) =>{
            if(err) return res.status(404).res.send(err)
            res.status(201).json({
                Success:true,
                Todo: data
            })
        })
    },
    deleteTodo(req,res) {
        const id = req.query.id
        Todo.findByIdAndRemove(id, (err,data)=>{
            if(err) return res.status(400).res.send(err)
            res.status(200).json({
                Success:true
            })
        })
    }
}