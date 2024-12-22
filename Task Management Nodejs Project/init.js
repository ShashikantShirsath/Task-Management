const mongoose = require("mongoose");
                                              //row data for testing
main().then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TaskManagement');
};  

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

let allTasks = [
    {
        title : "Homework",
        desc : "I have to complete homework before final exams",
        status : "Pending",
        created_at : new Date(),
        end_at : new Date(),
    },
    {
        title : "exam study",
        desc : "completing study by june for exams",
        status : "In Progress",
        created_at : new Date(),
        end_at : new Date(),
    },
    {
        title : "Gym",
        desc : "I have to do gym from 8am to 10am",
        status : "In Progress",
        created_at : new Date(),
        end_at : new Date(),
    },
    {
        title : "CET preparation",
        desc : "I have to start preperation from 1 jan 2025",
        status : "Pending",
        created_at : new Date(),
        end_at : new Date(),
    },
    {
        title : "Sports",
        desc : "we will do play cricket for each sunday",
        created_at : new Date(),
        end_at : new Date(),
    },
    {
        title : "Reading",
        desc : "I am going to start reading from monday",
        created_at : new Date(),
        end_at : new Date(),
    }
];

Task.insertMany(allTasks).then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})