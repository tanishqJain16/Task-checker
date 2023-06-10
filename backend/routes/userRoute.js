const router = require("express").Router();

const {
    currentUser,
  } = require("../controllers/userController");

  const authenticateToken = require("../middleware/authToken");
  
  router.get("/currentUser",authenticateToken, currentUser);

  module.exports = router;