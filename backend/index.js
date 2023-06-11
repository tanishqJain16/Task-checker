const express = require("express");				//eslint-disable-line
const helmet = require("helmet");				//eslint-disable-line
const morgan = require("morgan");				//eslint-disable-line
const { mysql_pool } = require("./db");			//eslint-disable-line
const bodyParser = require("body-parser");		//eslint-disable-line
const cors = require("cors");					//eslint-disable-line
const authRoute = require("./routes/authRoute");	//eslint-disable-line
const userRoute = require("./routes/userRoute");	//eslint-disable-line
const { db } = require("./db");					//eslint-disable-line
require("dotenv").config();						//eslint-disable-line

const app = express();
const PORT = process.env.PORT || 5000;			//eslint-disable-line

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("http://localhost:3000"));

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
	console.log(`server listening on ${PORT} 🎉🎉`);
});