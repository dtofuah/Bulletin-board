const pg = require('pg');

const config = {
	user: "postgres",
	database: "bulletinboard",
	password: "don",
	host: "localhost",
	port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function(err) {
	console.log("Pogress quary pool encounted an error", err);
});

module.exports = function(queryString, values, cb) {
	return pool.query(queryString, values, cb);
};
