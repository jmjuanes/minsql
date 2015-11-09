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

### CreateTable(table, def, callback)

Create a new table called `table`. The `def` argument must be an JSON object with the next structure:

- **cols**: an object with the cols for your new table. Each element must have the structure `"COL_NAME" : "COL_ATTR"`.
- **primary**: string with the PRIMARY KEY of your new table.
- **foreign**: an object with the FOREIGN KEYS for your table.

For example:

```json
{
	"cols": {"id": "int(11) NOT NULL", "name": "varchar(255) NOT NULL", "group": "int(2) NOT NULL", },
	"primary": "id",
	"foreign": {"group": "groups(proup_id)"}
}
```

This will generate the next SQL definition:

```sql
id int(11) NOT NULL,
name varchar(255) NOT NULL,
group int(2) NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (group) REFERENCES groups(group_id)
```


### DropTable(table, callback)

Drop the `table` table.


### Select(table, where, callback)

Select data from `table` with `where` conditions. The inputs arguments must be:

- `table`: string with name of the table.
- `where`: JavaScript object with the conditions. You can put one or more conditions. Set it to `null` for none conditions.
- `callback`: function for execute after running the query. The arguments of the function will be `error`, containing the error if exists, and `results`, containing the results of the query.

For example, runnig:

```javascript
db.Select('test', {"key1":"value1", "key2"="value2"}, function(err, results){ ... });
```

Is equivalent to running `SELECT * FROM test WHERE key1="value1" AND key2="value2"` on MySQL.


**IMPORTANT NOTE**: On version `0.4.1`, the `where` argument accepts an string as a WHERE condition, for make a more complex query. For example, if you want to select only the rows that `key1 <= 10` and `key2 > 0`, you can do:

```javascript
//Generate the where as a string
var where = 'key1 <= 10 AND key2 > 0';

//Get the results
db.Select('test', where, function(err, results){ ... });
```


### Insert(table, values, callback)

Insert a new row on the `table` with the desired `values`. For example, running:

```javascript
db.Insert('test', {"id": 1, "name": "John", "email": "john@me.com"}, function(error){
	//error contains the error if was occurred during running the query
});
```

Is equivalent to running `INSERT INTO test (id, name, email) VALUES (1, "John", "john@me.com")`.

In version `0.2.0` and higher, you can insert multiple rows in one query using an array. For example:

```javascript
var values = [{"id": 1, "name": "John"}, {"id": 2, "name": "Kevin"}];

db.Insert('test', values, function(error){ ... });
```

Is equivalent to running `INSERT INTO test (id, name) VALUES (1, "John"),(2, "Kevin")`.


### Update(table, set, where, callback)

Update from `table` the `set` cols from the rows that satisfy the `where` condition.

Example:

```javascript
db.Update('test', {"name": "Smith", "email": "smith@me.com"}, {"id": 1}, function(error){ ... });
```

Is equivalent to running `UPDATE test SET name="Smith" , email="smith@me.com" WHERE id=1`.


### Delete(table, where, callback)

Delete rows from `table` that satisfy the `where` condition. For example:

```javascript
db.Delete('test', {"id": 1}, function(error){ ... });
```

Is equivalent to running `DELETE FROM test WHERE id=1`.

### Query(sql, callback)

Do a more complex query, and get the results with the callback.

```javascript
db.Query('SELECT * FROM test WHERE id < 10 LIMIT 5', function(error, results) { ... });
```


## License

**minSQL** is under the [MIT](LICENSE) license.
