const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { mysql_pool } = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const { db } = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

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