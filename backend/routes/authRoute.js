const router = require("express").Router();			//eslint-disable-line
const {
	login,
	register,
} = require("../controllers/authController");			//eslint-disable-line

router.post("/register", register);
router.post("/login", login);

module.exports = router;			//eslint-disable-line
