const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Task = require("./models/task.js");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TaskManagement');
}  

app.listen(3031, () => {
    console.log('app is listening on port 3031');
});

app.get("/tasks", async (req, res) => {        // fetch all tasks route.
    let tasks = await Task.find();
    res.render("index.ejs", { tasks });
});

// register route
app.get("/tasks/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/tasks/register", (req, res) => {
    let {name, email, password, gender} = req.body;
    let user1 = new User({ name : name, email : email, password : password, gender : gender });

    user1.save().then((res) => {
        console.log("user registration successful");
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/tasks/login");
});

// login route
app.get("/tasks/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/tasks/login", async (req, res) => {
    let {name, password} = req.body;
    let user1 = await User.find({ $and: [{name : name}, {password : password}]})
    if(name == user1[0]['name'] && password == user1[0]['password']) {
        console.log("login successfully");
        res.redirect("/tasks");
    }
    else {
        res.redirect("/tasks/login");
    }

});

// dashboard route
app.get("/tasks/dashboard", async (req, res) => {
    let tasks = await Task.find();
    res.render("dashboard.ejs", { tasks });
});

// select task by id route
app.post("/tasks/taskById", async (req, res) => {
    let { id } = req.body;
    let task1 = await Task.findById(id);
    res.render("selectTaskById.ejs", { task1 });
});

// add task route
app.get("/tasks/dashboard/add", (req, res) => {
    res.render("addTask.ejs");
});

app.post("/tasks/addTask", (req, res) => {
    let {title, desc, status} = req.body;
    let task = new Task({ title : title, desc : desc, status : status, created_at : new Date(), end_at : new Date(), });

    task.save().then((res) => {
        console.log("task created");
    })
    .catch((err) => {
        console.log(err);
    });

    res.redirect("/tasks/dashboard");
});

//edit route
app.get("/tasks/:id/update", async (req, res) => {
    let { id } = req.params;
    let task1 = await Task.findById(id);
    res.render("updateTask.ejs", { task1 });
});

// update route
app.put("/tasks/:id", async (req, res) => {
    let { id } = req.params;
    let { desc : newDesc, status : newStatus } = req.body;
    let updatedTask = await Task.findByIdAndUpdate(id, {desc : newDesc, status : newStatus}, {runValidators: true, new:true}); 
    res.redirect("/tasks");
});

// delete route
app.delete("/tasks/:id", async (req, res) => {
    let { id } = req.params;
    console.log("delete request");
    let deletedTask = await Task.findByIdAndDelete(id, {new:true});
    res.redirect("/tasks");
});
