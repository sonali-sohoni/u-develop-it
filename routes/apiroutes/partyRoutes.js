const router = require("express").Router();
const db = require("../../db/connection");

router.get("/parties", (req, res) => {
	const sql = `select * from parties`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: "success", data: rows });
	});
});

router.get("/party/:id", (req, res) => {
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

router.delete("/party/:id", (req, res) => {
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
module.exports = router;
