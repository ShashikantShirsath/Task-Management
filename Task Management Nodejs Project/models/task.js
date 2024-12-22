const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
    },
    status : {
        type : String,
        enum : ['Pending', 'In Progress', 'Completed'],
        default : 'Pending',
    },
    created_at : {
        type : Date,
        require : true,
    },
    end_at : {
        type : Date,
        require : true,
    }
});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;