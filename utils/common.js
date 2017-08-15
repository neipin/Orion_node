var CopyQuerySession = function(data,req)
{
	data.query = {};
	data.session = {};
	var params = Object.getOwnPropertyNames(req.query);
	for(var i=0;i<params.length;i++)
	{
		data.query[params[i]] = req.query[params[i]];
	}
	
	params = Object.getOwnPropertyNames(req.session);
	for(var i=0;i<params.length;i++)
	{
		data.session[params[i]] = req.session[params[i]];
	}
};

exports.CopyQuerySession=CopyQuerySession;