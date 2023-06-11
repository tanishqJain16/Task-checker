const router = require("express").Router();         //eslint-disable-line

const {
    currentUser,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
  } = require("../controllers/userController");       //eslint-disable-line

  const authenticateToken = require("../middleware/authToken");     //eslint-disable-line
  
  router.get("/currentuser",authenticateToken, currentUser);
  router.get("/fetchtask",authenticateToken, fetchTasks);
  router.post("/addtask",authenticateToken, addTask);
  router.get("/deletetask/:id",authenticateToken, deleteTask);
  router.post("/updatetask/:id",authenticateToken, updateTask);

  module.exports = router;      //eslint-disable-line