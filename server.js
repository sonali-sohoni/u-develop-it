//initialize express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//connect to mysql
const mysql = require("mysql2");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to db
const db = mysql.createConnection(
	{
		localhost: "localhost",
		user: "root",
		password: "password",
		database: "election",
		port: "3310",
	},
	console.log("database connected successfully")
);

app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server is listening to port ${PORT}`);
});
