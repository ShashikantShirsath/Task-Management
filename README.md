# 1.Prerequisites
    1) Nodejs installtion
    2) MongoDB Database
# 2.Installation
    1) express
    2) mongoose
    3) ejs
    4) method-override
    5) nodemon
# 3.Runnig Server on
    port - localhost:3031/tasks

# 4.List of all API endpoints and their usage
    1) /tasks   (to fetch all tasks)
    2) /tasks/register  (register)
    3) /tasks/login   (login)
    4) /tasks/dashboard    (all tasks with edit & update btn)
    5) /tasks/taskById     (selecting task using id)
    6) /tasks/addTask      (insert task)
    7) /tasks/dashboard/add   (btn for insert task)
    8) /tasks/:id/update    (edit task route)
    9) /tasks/:id      (update task route)
    10) /tasks/:id     (delete task route)

# 5.Error Handling Middlewares
    1) middleware for all unknown routes handling
        app.all("*", (req, res, next) => {
            res.status(404).send("Page not found!");
        });
    2) error handling middleware
        app.use((err, req, res, next) => {
            let {status = 500, message= "Something wen't wrong!"} = err;
            res.status(status).send(message);
        });
