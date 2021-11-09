//initialize express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//connect to mysql
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");
const db = require("./db/connection");
const apiroutes = require("./routes/apiroutes")
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiroutes);



//api endpoint to get all candidates

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
