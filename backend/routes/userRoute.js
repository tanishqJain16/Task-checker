const router = require("express").Router();

const {
    currentUser,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  } = require("../controllers/userController");

  const authenticateToken = require("../middleware/authToken");
  
  router.get("/currentuser",authenticateToken, currentUser);
  router.get("/fetchtask",authenticateToken, fetchTasks);
  router.post("/addtask",authenticateToken, addTask);
  router.get("/deletetask/:id",authenticateToken, deleteTask);
  router.post("/updatetask/:id",authenticateToken, updateTask);

  module.exports = router;