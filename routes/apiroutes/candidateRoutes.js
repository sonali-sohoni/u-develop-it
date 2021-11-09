const router = require("express").Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get("/candidates", (req, res) => {
	const sql = `select candidates.*,parties.name as party_name from candidates left join parties on candidates.party_id = parties.id`;
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
router.get("/candidate/:id", (req, res) => {
	const sql = `select candidates.*, parties.name as party_name from candidates left join parties on candidates.party_id = parties.id where candidates.id =?`;
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

router.post("/api/candidate", ({ body }, res) => {
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

router.delete("/candidate/:id", (req, res) => {
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

router.put("/candidate/:id", (req, res) => {
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

module.exports = router;
