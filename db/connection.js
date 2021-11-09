//connect to database

const mysql = require("mysql2");

const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "password",
		database: "election",
		port: 3310,
	},
	console.log("database connected successfully")
);
module.exports = db;
