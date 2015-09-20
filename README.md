Release notes 0.2.0

# minSQL

Minimal and easy MySQL driver for Node.JS.

[![npm](https://img.shields.io/npm/v/minsql.svg?style=flat-square)](https://www.npmjs.com/package/minsql)
[![npm](https://img.shields.io/npm/dt/minsql.svg?style=flat-square)](https://www.npmjs.com/package/minsql)


## Installation

You can install **minSQL** directly using NPM:

```sh
npm install minsql
```

You can add it to your Node.JS project adding this line

```javascript
var db = require('minsql');
```

## API

### Connect(host, user, pass, database)

Connect to your database. Example of use:

```javascript
db.Connect('localhost', 'myuser', 'mypass', 'test');
```


### Close()

Close the connection to the database.


### Select(table, where, callback)

Select data from `table` with `where` conditions. The inputs arguments must be:

- `table`: string with name of the table.
- `where`: JavaScript object with the conditions. You can put one or more conditions. Set it to `null` for none conditions.
- `callback`: function for execute after running the query. The arguments of the function will be `error`, containing the error if exists, and `results`, containing the results of the query.

For example, runnig:

```javascript
db.Select('test', {"key1":"value1", "key2"="value2"}, function(err, results){});
```

Is equivalent to running `SELECT * FROM test WHERE key1="value1" AND key2="value2"` on MySQL.


### Insert(table, values, callback)

Insert a new row on the `table` with the desired `values`. For example, running:

```javascript
db.Insert('test', {"id": 1, "name": "John", "email": "john@me.com"}, function(error){
	//error contains the error if was occurred during running the query
});
```

Is equivalent to running `INSERT INTO test (id, name, email) VALUES (1, "John", "john@me.com")`.

In version `0.2.0` and higher, you can insert multiple values in one query using an array. For example:

```javascript
var values = [{"id": 1, "name": "John"}, {"id": 2, "name": "Kevin"}];

db.Insert('test', values, function(error){  });
```

Is equivalent to running `INSERT INTO test (id, name) VALUES (1, "John"),(2, "Kevin")`.


### Update(table, set, where, callback)

Update from `table` the `set` cols from the rows that satisfy the `where` condition. 

Example:

```javascript
db.Update('test', {"name": "Smith", "email": "smith@me.com"}, {"id": 1}, function(error){ });
```

Is equivalent to running `UPDATE test SET name="Smith" , email="smith@me.com" WHERE id=1`.


### Delete(table, where, callback)

Delete rows from `table` that satisfy the `where` condition. For example:

```javascript
db.Delete('test', {"id": 1}, function(error){  });
```

Is equivalent to running `DELETE FROM test WHERE id=1`.



## License

**minSQL** is under the [MIT](LICENSE) license.

