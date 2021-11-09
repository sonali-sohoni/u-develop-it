const router = require("express").Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get("/voters", (req, res) => {
	const sql = `select * from voters order by last_name`;
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: "success", data: rows });
	});
});

router.get("/voter/:id", (req, res) => {
	const sql = `select * from voters where id = ?`;
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else {
			res.json({ message: "success", data: result });
		}
	});
});

router.post("/voter", ({ body }, res) => {
	const errors = inputCheck(body, "first_name", "last_name", "email");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}
	const sql = `insert into voters (first_name,last_name,email) values(?,?,?)`;
	const params = [body.first_name, body.last_name, body.email];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "success", data: body });
	});
});

router.put("/voter/:id", (req, res) => {
	const errors = inputCheck(req.body, "email");
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}
	const sql = `update voters set email = ? where id= ?`;
	const params = [req.body.email, req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else if (!result.affectedRows) {
			res.json({ message: "voter not found" });
		} else {
			res.json({
				message: "success",
				changes: result.affectedRows,
				data: req.body,
			});
		}
	});
});

router.delete("/voter/:id", (req, res) => {
	const sql = "delete from voters where id = ?";
	const params = [req.params.id];
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else if (!result.affectedRows) {
			res.json({ message: "id not found" });
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
