
const body = require("body-parser");
const express = require("express");
const app = express();
const query = require("./query");
const Bulletin = require("./bulletin");

app.use(express.static("assets"));


app.set("view engine", "ejs");
app.use(body.urlencoded());
app.use(body.json());






function renderBulletin(res, body) {
	Bulletin.getAll().then(function(title) {
		res.render("main", {
			title: title,
			body: body,

		});
	});
}

app.get("/", function(req, res) {
	renderBulletin(res);
});

app.get("/form", function(req, res) {
	res.render("form", {
		title: req.body.title,
		body: req.body.body,
	});
});

app.post("/add", function(req, res) {
	if (req.body.title === "") {
		res.redirect("/error?message==Please%20Enter%20the%20Description%20of%20Forecast");
		return;
	}
	else if (req.body.body === "") {
		res.redirect("/error?message==Please%20Enter%20the%20Description%20of%20Forecast");
		return;
	}

	Bulletin.add([req.body.title, req.body.body]).then(function() {
		renderBulletin(res, "Saved" + req.body.title);
	});
});


app.get("/error", function(req, res) {
	res.render("error");
});


const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
