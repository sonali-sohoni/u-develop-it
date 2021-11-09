//initialize express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//connect to mysql
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

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

// db.query("select * from candidates where id =1", (err, rows) => {
// 	console.log(rows);
// });

// const insertsql = `insert into candidates (id,first_name,last_name,industry_connected ) values (?,?,?,?)`;
// const params = [1, "Ronald", "Firbank", 1];
// db.query(insertsql, params, (err, result) => {
// 	if (err) console.log(err);
// 	else console.log(result);
// });

//api endpoint to get all candidates
app.get("/api/candidates", (req, res) => {
	const sql = `select candidates.*,parties.name as party_name from candidates left join parties on candidates.id = parties.id`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			console.log(err);
			return;
		}

		res.json({
			message: "success",
			data: rows,
		});
	});
});

//api endpoint to retrieve information about single candidate with id
app.get("/api/candidate/:id", (req, res) => {
	const sql = `select candidates.*,parties.name as party_name from candidates left join parties on candidates.id = parties.id where candidates.id =?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send({
			message: "success",
			data: result,
		});
	});
});

app.post("/api/candidate", ({ body }, res) => {
	const errors = inputCheck(
		body,
		"first_name",
		"last_name",
		"industry_connected"
	);
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}
	const sql = `insert into candidates (first_name,last_name,industry_connected) values (?,?,?)`;
	const params = [body.first_name, body.last_name, body.industry_connected];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.send({
			message: "success",
			data: body,
		});
	});
});

app.delete("/api/candidate/:id", (req, res) => {
	console.log("You are in delete route");
	const params = [req.params.id];
	db.query(`delete from candidates where id = ?`, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else if (!result.affectedRows) {
			res.json({
				message: "candidate not found",
			});
		} else {
			res.send({
				message: "deleted",
				changes: result.affectedRows,
				outcome: result,
				id: req.params.id,
			});
		}
		console.log(result);
	});
});

//api for update candidate table

app.put("/api/candidate/:id", (req, res) => {
	const errors = inputCheck(req.body, "party_id");

	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}
	const sql = `update candidates set party_id = ? where id = ?`;
	const params = [req.body.party_id, req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else if (!result.affectedRows) {
			res.json({ message: "candidate not found" });
		} else {
			res.json({
				message: "success",
				data: req.body,
				changes: result.affectedRows,
			});
		}
	});
});

//api for parties

app.get("/api/parties", (req, res) => {
	const sql = `select * from parties`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: "success", data: rows });
	});
});

app.get("/api/party/:id", (req, res) => {
	const sql = `select * from parties where id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "success", data: result });
	});
});

app.delete("/api/party/:id", (req, res) => {
	const sql = `delete from parties where id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
		} else if (!result.affectedRows) {
			res.json({
				message: "party not found",
			});
		} else {
			res.json({
				message: "deleted",
				changes: result.affectedRows,
				id: req.params.id,
			});
		}
	});
});

//

//middleware to report 404 -page not found for the unhandled requests
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server is listening to port ${PORT}`);
});
