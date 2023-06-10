const router = require("express").Router();

const {
    currentUser,
    fetchTasks,
    addTask,
  } = require("../controllers/userController");

  const authenticateToken = require("../middleware/authToken");
  
  router.get("/currentuser",authenticateToken, currentUser);
  router.get("/fetchtask",authenticateToken, fetchTasks);
  router.post("/addtask",authenticateToken, addTask);

  module.exports = router;