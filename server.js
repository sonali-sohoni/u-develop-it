//initialize express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//connect to mysql
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");
const db = require("./db/connection");
const apiroutes = require("./routes/apiroutes");
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiroutes);

//api endpoint to get all candidates

//api for parties

//

//middleware to report 404 -page not found for the unhandled requests
app.use((req, res) => {
	res.status(404).end();
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database connected.");
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});

// app.listen(PORT, () => {
// 	console.log(`Server is listening to port ${PORT}`);
// });
