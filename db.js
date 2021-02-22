const promise = require('bluebird');
const initOptions = {
	 promiseLib: promise 
};
// Loading and initializing the library:
const pgp = require('pg-promise')(initOptions);

// Preparing the connection details:
const cn = { host: 'localhost',database :'chat_base',user:'postgres',password :'',port: 5432};

// Creating a new database instance from the connection details:
const db = pgp(cn);

// Exporting the database object for shared use:
module.exports = db;
