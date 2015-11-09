//Import dependencies
var mysql = require('mysql');

//Import libs for query
var QueryWhe = require('./query/where');
var QueryIns = require('./query/insert');
var QueryUpd = require('./query/update');

//Impor lib for create
var CreateDef = require('./create.js');

//Private state
var mindb = null;

//Connect to db
exports.Connect = function(host, user, pass, database)
{
	//If db is not created
	if(!mindb)
	{
		//Generate mysql config
		var connect = {};

		//Save the vars
		connect.host = host;
		connect.user = user;
		connect.password = pass;
		connect.database = database;

		//Create the connection
		mindb = mysql.createConnection(connect);

		//Connect to db
		mindb.connect(function(err){

			//Check for error
			if(err)
			{
				//Show the error
				console.log('Error connecting to database...');

				//Return
				return ;
			}

			//Show connection ok
			console.log('Connection established!');
		});
	}
};

//Close database
exports.Close = function()
{
	//Check if database is created
	if(mindb)
	{
		//Close the db
		mindb.end();

		//Delete the mindb
		mindb = null;
	}
};


//Create table
exports.CreateTable = function(table, def, callback)
{
	//Generate the query
	var sql = 'CREATE TABLE ' + table;

	//Add the table definitions
	sql = sql + ' ( ' + CreateDef(def) + ') ';

	//Add the table options
	sql = sql + 'ENGINE=InnoDB DEFAULT CHARSET=utf8;';

	//Run the query
	mindb.query(sql, function(error){

		//Call the callback function
		callback(error);

	});
};

//Drop table
exports.DropTable = function(table, callback)
{
	//Generate the query
	var sql = 'DROP TABLE ' + table;

	//Run the query
	mindb.query(sql, function(error){

		//Call the callback function
		callback(error);

	});
};

//Select from database
exports.Select = function(table, where, callback)
{
	//Generate the query
	var sql = 'SELECT * FROM ' + table;

	//Check where
	if(where)
	{
		//Add the WHERE
		sql = sql + ' WHERE ' + QueryWhe(where);
	}

	//Database connection
	mindb.query(sql, function(error, results, fields){

		//Call the callback function with the results
		callback(error, results);

	});
};

//Insert on database
exports.Insert = function(table, values, callback)
{
	//Generate the query
	var sql = 'INSERT INTO ' + table + ' ' + QueryIns(values);

	//Database connection
	mindb.query(sql, function(error){

		//Call the callback function with the errors
		callback(error);

	});
};

//Update one record
exports.Update = function(table, set, where, callback)
{
	//Generate the set SQL
	var sql = 'UPDATE ' + table + ' SET ' + QueryUpd(set) + ' WHERE ' + QueryWhe(where);

	//Database connection
	mindb.query(sql, function(error){

		//Call the callback function with the errors
		callback(error);

	});
};

//Delete from database
exports.Delete = function(table, where, callback)
{
	//Generate the sql
	var sql = 'DELETE FROM ' + table + ' WHERE ' + QueryWhe(where);

	//Database connection
	mindb.query(sql, function(error){

		//Call the callback function with the errors
		callback(error);

	});
};

//Do a custom query
exports.Query = function(sql, callback)
{
	//Database connection
	mindb.query(sql, function(error, results, fields){

		//Call the callback function with the results
		callback(error, results);

	});
};
