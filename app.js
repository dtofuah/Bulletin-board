
const body = require("body-parser");
const express = require("express");
const app = express();
const query = require("./query");
const Bulletin = require("./bulletin");

app.use(express.static("assets"));


app.set("view engine", "ejs");
app.use(body.urlencoded());
app.use(body.json());






function renderBulletin(res, title) {
	Bulletin.getAll().then(function(body) {
		res.render("main", {
			title: title,
			body: body,
		});
	});
}

app.get("/", function(req, res) {
	renderBulletin(res);
});

app.post("/", function(req, res) {
	Bulletin.add(req.body.title).then(function() {
		renderBulletin(res, "Saved " + req.body.title);
	});
});

app.get("/search", function(req, res) {
	Bulletin.search(req.query.search).then(function(result) {
		res.render("main", {
			title: result.rows,
			// body: body,
		});
	});
});


const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
