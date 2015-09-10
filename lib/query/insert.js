//Query insert
function QueryInsert(data)
{
	//Strings
	var sql_atr = '', sql_val = '';
	
	//Loop
	for(var key in data)
	{
		//Save data value
		var value = data[key];
		
		//Check the data type
		if(typeof value === 'string' || value instanceof String)
		{
			//Add the quotes
			value = '"' + value + '"';
		}
		
		//Check for the first item
		if(sql_atr !== '')
		{
			//Add a new comma
			sql_atr = sql_atr + ',';
			sql_val = sql_val + ',';
		}
		
		//Add the sentence
		sql_atr = sql_atr + key;
		sql_val = sql_val + value;
	}
	
	//Paste
	var sql = '(' + sql_atr + ') VALUES (' + sql_val + ')';
	
	//Return
	return sql;
}

//Exports
module.exports = QueryInsert;
