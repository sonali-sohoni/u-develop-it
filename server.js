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

db.query("select * from candidates where id =1", (err, rows) => {
	console.log(rows);
});

// db.query(`delete from candidates where id = ?`, 1, (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(result);
// 	}
// });

const insertsql = `insert into candidates (id,first_name,last_name,industry_connected ) values (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];
db.query(insertsql, params, (err, result) => {
	if (err) console.log(err);
	else console.log(result);
});

app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server is listening to port ${PORT}`);
});
