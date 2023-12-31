const jwt = require("jsonwebtoken");			//eslint-disable-line

module.exports = function authenticateToken(req, res, next) {			//eslint-disable-line
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) {
		return res.status(400).json("no token recieved ;)");
	}

	jwt.verify(token, "jwtsectret", (err, email) => {
		if (err) {
			return res.status(403).json("Invalid token ;)");
		}
		req.email = email;
		next();
	});
};
