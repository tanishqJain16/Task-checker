const mysql = require("mysql2");

var mysql_pool = mysql.createPool({
	connectionLimit: 100,
	connectTimeout:60*60*1000,
	acquireTimeout:60*60*1000,
	timeout:60*60*1000,
	host: "containers-us-west-192.railway.app",
	user: "root",
	password: "ZxPmYnkWMgaSp6kQdATL",
	database: "railway",
	port: 6838,
});

module.exports = {
	mysql_pool,
};
