const { mysql_pool } = require("../db");			
const bcrypt = require("bcrypt");					
const jwt = require("jsonwebtoken");				

//Register
const register = async (req, res) => {
	mysql_pool.getConnection(async function (err, connection) {
		if (err) {
			console.log(" Error getting mysql_pool connection: " + err);
			res.status(500).send({ message: "try again" });
			return;
		}
		try {
			const username = req.body.username;
			const password = req.body.password;
			const email = req.body.email;
			const salt = await bcrypt.genSalt(10);
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					res.status(500).send(err);
					return;
				}
				connection.query(
					`INSERT INTO users (email, name, password) VALUES (?,?,?)`,
					[email, username, hash],
					function (err, result) {			
						if (err) {
							res.status(400).send({
								message: "Already registered !!",
                                success:false,

							});
							console.log(err)
							return;
						} else {
                            const token = jwt.sign({ email }, "jwtsectret");
							res.status(200).send({
								message: "registered successfully:)",
                                success:true,
                                token: token,
							});
							return;
						}
					}
				);
			});
		} catch (err) {
			res.status(500).send(err);
			return;
		}
		connection.release();
	});
};

//login
const login = async (req, res) => {
	mysql_pool.getConnection(function (err, connection) {
		if (err) {
			console.log(" Error getting mysql_pool connection: " + err);
			res.status(500).send({ message: "try again" });
			return;
		}
		try {
			const email = req.body.email;
			const password = req.body.password;
			if (!email || !password) {
				res.status(400).send({ messaage: "password or email not recieved!", success:false });
				return;
			}

			connection.query(
				`SELECT * FROM users where email= ? `,
				email,
				(err, result) => {
					if (result && result.length > 0) {
						bcrypt.compare(password, result[0].password, (err, response) => {
							if (!response) {
								res.status(401).send({
									message: "wrong combination of username and password",
                                    success:false
								});
								return;
							} else {
								const email = result[0].email;
								const token = jwt.sign({ email }, "jwtsectret");
								res.status(200).json({ token: token, success:true });
								return;
							}
						});
					} else if (result == 0) {
						res.status(404).send({ message: "user does not exist!!" });
						return;
					} else if (err) {
						res.status(500).send(err);
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
	register,
	login,
};