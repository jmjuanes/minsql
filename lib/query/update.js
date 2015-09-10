//Query for update
function QueryUpdate(data)
{
	//Initialize the set
	var set = '';
	
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
		
		//Check if is necessary add the comma
		if(set !== '')
		{
			//Add the comma
			set = set + ' , ';
		}
		
		//Add the key=value
		set = set + key + '=' + value;
	}
	
	//Return
	return set;
}

//Exports to node
module.exports = QueryUpdate;