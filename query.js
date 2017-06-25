const pg = require('pg');

const config = {
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function(err) {
	console.log("Pogress quary pool encounted an error", err);
});

module.exports = function(queryString, values, cb) {
	return pool.query(queryString, values, cb);
};
