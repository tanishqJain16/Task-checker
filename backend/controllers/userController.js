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

module.exports = {
    currentUser,
};