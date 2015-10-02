//Main function
function Create(def)
{
	//Output
	var out = '';

	//Check for cols
	if(def.cols)
	{
		//Add the output string for cols
		out = out + CreateRows(def.cols);
	}

	//Check for PrimaryKey
	if(def.primary)
	{
		//Add to the output string for primary key
		out = out + ', PRIMARY KEY (' + def.primary + ')';
	}

	//Check for FOREIGN
	if(def.foreign)
	{
		//Add the output string for foreign
		out = out + CreateForeign(def.foreign);
	}

	//Return
	return out;
}

//Create the Rows
function CreateRows(obj)
{
	//Start the output
	var out = '';

	//Get all
	for(var key in obj)
	{
		//Check the out
		if(out !== '')
		{
			//Add a comma
			out = out + ', ';
		}

		//Add the row
		out = out + key + ' ' + obj[key];
	}

	//Return the output
	return out;
}

//Create Foreign
function CreateForeign(obj)
{
	//Start the output
	var out = '';

	//Loop
	for(var key in obj)
	{
		//Add the comma
		out = out + ', ';

		//Add the foreign
		out = out + 'FOREIGN KEY (' + key + ') ';

		//Add the references
		out = out + 'REFERENCES ' + obj[key];
	}

	//Return the output
	return out;
}

//Exports
module.exports = Create;
