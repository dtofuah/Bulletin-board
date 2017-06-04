const query = require("./query");

const Bulletin = {
	getAll: function() {
		return query("SELECT * FROM messages").then(function(res) {
			return res.rows;
		});
	},

	add: function(title) {
		return query("INSERT INTO messages (title) VALUES ($1)", [title]);
	},

	search: function(search) {
		return query("SELECT * FROM messages WHERE title LIKE $1", ["%" + search + "%"])
			.then(function(res) {
				return res.rows;
			});
	},
};

module.exports = Bulletin;
