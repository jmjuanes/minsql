//Query String Where function
function QueryWhere(data)
{
	//Initialize the string
	var sql = '';
	
	//Get all data
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
		
		//Check if is necessary add the AND
		if(sql !== '')
		{
			//Add the AND
			sql = sql + ' AND ';
		}
		
		//Add the key=value
		sql = sql + key + '=' + value;
	}
	
	//Return the string
	return sql;
}

//Exports
module.exports = QueryWhere;