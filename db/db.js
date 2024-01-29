const mysql = require('mysql2');

var conString = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:3306/${process.env.DB_DB}`;
// console.log(process.env)
// console.log(process.env.DB_USER, process.env.DB_HOST, process.env.DB_DB, process.env.DB_PASS, process.env.DB_PORT)
// const pool = new Pool(
// 	{
// 		user: process.env.DB_USER,
// 		host: process.env.DB_HOST,
// 		database: process.env.DB_DB,
// 		password: process.env.DB_PASS,
// 		port: process.env.DB_PORT,
// 		// ssl: {
// 		// 	rejectUnauthorized: true
// 		// }
// 	}
// );
const pool = mysql.createPool({
	// debug: 1,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DB,
	password: process.env.DB_PASS,
	// port: process.env.DB_PORT,
		

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});


pool.getConnection(function (err, connection) {
	if (err instanceof Error) {
	   console.log("err");
    console.log(err);
    return;
  }

  // ... some query

//   connection.release();
});

// pool.connect().then((client) => {
// 	client.release();
// 	console.info('DB successfully connected');
// }).catch((e) => {

// 	console.error('query error', e.message, e.stack)
// });

module.exports = {
	query: function (query, data, cb) {
		console.log('query', query, 'data', data)
		return pool.query(query, data, cb);
	},
	getClient: function (query, data, cb) {
		return pool.connect();
			// return pool.promise();
	},
	pool
};