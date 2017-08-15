var rp = require('request-promise');

var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/common/DataDictionary',//请求数据字典
			body: {
				
			},
			json: true
		};
		
		rp(options)
			.then(function(parsedBody){
				for(var o in parsedBody.tuijianState)
				{
					tuijianState.put(parsedBody.tuijianState[o].code,parsedBody.tuijianState[o].value);
					
				}
				for(var o in parsedBody.workyears)
				{
					workyears.put(parsedBody.workyears[o].code,parsedBody.workyears[o].value);
					
				}
				for(var o in parsedBody.college_level)		
				{
					college_level.put(parsedBody.college_level[o].code,parsedBody.college_level[o].value);
					
				}
				for(var o in parsedBody.customer_status)		
				{
					customer_status.put(parsedBody.customer_status[o].code,parsedBody.customer_status[o].value);
					
				}
				for(var o in parsedBody.customer_guimo)		
				{
					customer_guimo.put(parsedBody.customer_guimo[o].code,parsedBody.customer_guimo[o].value);
					
				}
				for(var o in parsedBody.job_status)		
				{
					job_status.put(parsedBody.job_status[o].code,parsedBody.job_status[o].value);
					
				}

			})
			
