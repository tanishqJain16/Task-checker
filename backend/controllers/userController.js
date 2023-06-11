const { mysql_pool } = require("../db");            
require("dotenv").config();                         

const currentUser = async (req, res) => {
	mysql_pool.getConnection(function (err, connection) {
		if (err) {
			console.log(" Error getting mysql_pool connection: " + err);
			res.status(500).send({ message: "try again" });
			return;
		}
		try {
			connection.query(
                `SELECT * FROM users WHERE email = ?`,
                [req.email.email],
                function (err, result) {
                    if (err) {
                        res.status(400).send({
                            message: "no user found",
                            success: false,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "user found",
                            success: true,
                            email: result[0].email,
                            name: result[0].name,
                        });
                        return;
                    }
                }
            );
		} catch (err) {
			res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

const fetchTasks = async (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            console.log(" Error getting mysql_pool connection: " + err);
            res.status(500).send({ message: "try again" });
            return;
        }
        try {
            const email = req.email.email;
            connection.query(
                `SELECT * FROM tasks WHERE email = ?`,
                [email],
                function (err, result) {
                    if (err) {
                        res.status(400).send({
                            message: "no tasks found",
                            success: false,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "tasks found",
                            success: true,
                            tasks: result,
                        });
                        return;
                    }
                }
            );
        } catch (err) {
            res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

const addTask = async (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            console.log(" Error getting mysql_pool connection: " + err);
            res.status(500).send({ message: "try again" });
            return;
        }
        try {
            const email = req.email.email;
            const task = req.body.task;
            if (!task) {
                res.status(400).send({ message: "task not recieved!", success: false });
                return;
            }
            connection.query(
                `INSERT INTO tasks (email,task) VALUES (?,?)`,
                [email, task],
                function (err, result) {            
                    if (err) {
                        res.status(400).send({
                            message: "task not added",
                            success: false,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "task added",
                            success: true,
                        });
                        return;
                    }
                }
            );
        } catch (err) {
            res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

const deleteTask = async (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            console.log(" Error getting mysql_pool connection: " + err);
            res.status(500).send({ message: "try again" });
            return;
        }
        try {
            const email = req.email.email;
            const taskid = req.params.id;
            if (!taskid) {
                res.status(400).send({ message: "taskid not recieved!", success: false });
                return;
            }
            connection.query(
                `DELETE FROM tasks WHERE email = ? AND taskid = ?`,
                [email, taskid],
                function (err, result) {
                    if (err) {
                        res.status(400).send({
                            message: "task not deleted",
                            success: false,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "task deleted",
                            success: true,
                        });
                        return;
                    }
                }
            );
        } catch (err) {
            res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

const updateTask = async (req, res) => {
    mysql_pool.getConnection(function (err, connection) {
        if (err) {
            console.log(" Error getting mysql_pool connection: " + err);
            res.status(500).send({ message: "try again" });
            return;
        }
        try {
            const email = req.email.email;
            const taskid = req.params.id;
            const task = req.body.task;
            if (!task) {
                res.status(400).send({ message: "task not recieved!", success: false });
                return;
            }
            connection.query(
                `UPDATE tasks SET task = ? WHERE email = ? AND taskid = ?`,
                [task, email, taskid],
                function (err, result) {
                    if (err) {
                        res.status(400).send({
                            message: "task not updated",
                            success: false,
                        });
                        return;
                    } else {
                        res.status(200).send({
                            message: "task updated",
                            success: true,
                        });
                        return;
                    }
                }
            );
        } catch (err) {
            res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

module.exports = {              
    currentUser,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
};