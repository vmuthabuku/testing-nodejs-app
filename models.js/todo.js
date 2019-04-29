const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    todo:{
        type:String,
        required:true
    }
   
},{timestamps:true})

const Todo= mongoose.model("Todo", todoSchema )

module.exports = {Todo}