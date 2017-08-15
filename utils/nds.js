var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var common = require('../utils/common');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录路由 start
router.post('/login', function(req, res) {//post 用body
	var userid         = req.body.userid;
	var username       = req.body.username;
	var company_openid = req.body.company_openid;	
	var permission 		 = req.body.permission;
	var role 		 = req.body.role;
	
	req.session.userid = userid;
	req.session.username = username;
	req.session.permission = permission;
	req.session.company_openid = company_openid;
	req.session.role = role;
	
res.end();
});
//登录路由 end



//客户管理 start
	router.get('/mycustomer', function(req, res, next){	
		var result = {};
		common.CopyQuerySession(result,req);
		res.render('./business/companyManage', result);
});

	router.get('/companyManageCon', function(req, res, next){	
		var company_openid = req.session.company_openid;  //公司openid
		var city = req.query.city;
		var status = req.query.status;
		var cp = req.query.cp;		
		var searchtag = req.query.searchtag;	
		if(!cp)
		{
			cp = '1';
		}		

		var result = {};
		common.CopyQuerySession(result,req);
		var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/myCustomers',
			body: {
				company_openid:company_openid,
				currentPage:cp,
				searchtag:searchtag,
				city:city,
				status:status
			},
			json: true
		};
		rp(options)
			.then(function(parsedBody){
				result.data=parsedBody;	
				console.log('1233333'+result.data.totalPages);
				res.render('./business/companyManageCon', result);
			})	
});



//客户管理 end
//公司详情 start
router.get('/companydetail', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var result = {};
	var customer_id = req.query.customer_id;	  //客户id
	var options1 = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customerinfo',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	var options2 = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customer/staffnum',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	var api1 = rp(options1)
		.then(function(parsedBody){
			result.data1=parsedBody;
		});
			
	var api2 = rp(options2)
		.then(function(parsedBody){
			result.data2=parsedBody;
		});
	
	Promise
		.all([api1, api2])
		.then(function(results) {
		    ret.data=result.data1;	
				ret.numtab=result.data2;
				res.render('./business/companydetail', ret);
		});
});
//公司详情 end
//编辑、添加公司信息start

router.get('/editcompany', function(req, res, next){	
		var ret = {};
		common.CopyQuerySession(ret,req);
		var result = {};
		var customer_id = req.query.customer_id;  //客户id
		var company_openid = req.session.company_openid;  //客户id
		
		var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/customer/edit',			
			body: {
				customer_id:customer_id	
			},
			json: true
		};
		
		var options2 = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/all_member',			
			body: {
				company_openid:company_openid
			},
			json: true
		};		
		
		var api1 = rp(options)
			.then(function(parsedBody){
				result.data1=parsedBody;
			});
//		联系人接口
		var api2 = rp(options2)
			.then(function(parsedBody){
				result.data2=parsedBody;
			});
			
		Promise
		.all([api1, api2])
		.then(function(results) {
		    ret.data=result.data1;	
				ret.contact=result.data2;
				res.render('./business/editcompany', ret);
		});
});

//客户基本信息 start
router.get('/baseinfo', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var customer_id = req.query.customer_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customerinfo',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./business/baseinfo', ret);
		})	
		
});
//客户基本信息 end
//客户管理-项目 start
router.get('/item', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var customer_id = req.query.customer_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customerjobs',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			console.log(ret);
			res.render('./business/item', ret);
		})	
		
});
//客户管理-项目 end
//客户管理-资料 start
router.get('/datum', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var customer_id = req.query.customer_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customerziliao',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./business/datum', ret);
		})	
		
});
//客户管理-资料 end
//客户管理-沟通记录 start
router.get('/communicate', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var customer_id = req.query.customer_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customer/commrcd',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;			
			console.log(ret);
			res.render('./business/communicate', ret);
		})	
		
});
//客户管理-沟通记录 end
//客户管理-合同 start
router.get('/contact', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);
	var customer_id = req.query.customer_id;	  //客户id	
	
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/customer/contracts',
		body: {
			customer_id:customer_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;				
			res.render('./business/contact', ret);
		})
});
//客户管理-合同 end


//项目管理 start
router.get('/project', function(req, res, next){	
	var ret = {};
	common.CopyQuerySession(ret,req);	
	res.render('./project/project', ret);
});

router.get('/projectcon', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);	
	var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/jobs/list',
			body: {
				city:req.query.city,
				company_openid:req.session.company_openid,				
				guwen_id:req.query.guwen_id,
				keywd:req.query.keywd,
				level:req.query.level,
				open_end:req.query.open_end,
				open_start:req.query.open_start,
				status:req.query.status,
				func:req.query.func
			},
			json: true
		};
		
		rp(options)
			.then(function(parsedBody){
				ret.data=parsedBody;	
				console.log('项目列表'+ret.data.totalPages);
				res.render('./project/projectcon', ret);
			})	

});
//项目编辑
router.get('/editproject', function(req, res, next){
	var ret = res.result;
	var job_id = req.query.job_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/edit',
		body: {
			job_id:job_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/editproject', ret);
		})	
});
//项目详情 start
router.get('/projectdetail', function(req, res, next){
	var ret = res.result;
	var result = {};
	var job_id = req.query.job_id;	  //项目id	
	var company_openid = req.session.company_openid;	  //公司id	
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/getothernum', //获取数量
		body: {
			job_id:job_id,
			company_openid:company_openid
		},
		json: true
	};
	var options2 = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/basic',//获取头部的基本信息
		body: {
			job_id:job_id
		},
		json: true
	};
	
	var api1 = rp(options)
		.then(function(parsedBody){
			result.data1=parsedBody;
		});
//		获取头部的基本信息接口
	var api2 = rp(options2)
		.then(function(parsedBody){
			result.data2=parsedBody;
		});
		
	Promise
	.all([api1, api2])
	.then(function(results) {
	    ret.data_num=result.data1;	
			ret.data=result.data2;
			console.log("项目详情**********"+results);	
			res.render('./project/projectdetail', ret);
	});
});
//项目详情 end
//项目tab切换 start
router.get('/probaseinfo', function(req, res, next){
	var ret = res.result;
	var job_id = req.query.job_id;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/basic',
		body: {
			job_id:job_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;						
			res.render('./project/probaseinfo', ret);
		})	
		
});

router.get('/procommunicate', function(req, res, next){
	var ret = res.result;
	var job_id = req.query.job_id;	  //项目id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/commlist',
		body: {
			job_id:job_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			console.log(parsedBody);
			ret.data=parsedBody;	
			res.render('./project/procommunicate', ret);
		})	
		
});
//项目成员 start
router.get('/itemmember', function(req, res, next){
	var ret = res.result;
	var job_id = req.query.job_id;	  //项目id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/operateteam',
		body: {
			company_openid:req.session.company_openid,
			job_id:job_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/itemmember', ret);
		})	
});
//项目成员 end
//弹出框简历
router.get('/popresume', function(req, res, next){	
	var ret = res.result;
	var resume_openid = req.query.resume_openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/resume_full_data',
		body: {
			openid:resume_openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/popresume', ret);
		})	
});
//弹出框简历 end
//弹出框备注 start
router.get('/remarks', function(req, res, next){
	var ret = res.result;
	var resume_openid = req.query.resume_openid;	  //客户id
	console.log(111111111111111111111111+resume_openid);
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/beizhu',
		body: {
			resume_openid:resume_openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			console.log(222222222222222222222+parsedBody);
			ret.data=parsedBody;	
			console.log(33333333333+ret.data.beizhuList);
			res.render('./project/remarks', ret);
		})	
});
//弹出框备注 end

//人才tab start
router.get('/goodman', function(req, res, next){
	var ret = res.result;
	var job_id  = req.query.job_id;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/candi_num',// 人才数量接口
		body: {
			job_id:job_id
		},
		json: true
	};	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/goodman', ret);			
		})		
});
router.get('/goodmaninfo', function(req, res, next){
	var ret = res.result;
	var cur_status = req.query.cur_status;
	var job_id = req.query.job_id;	
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/candidate',
		body: {
			cur_status:cur_status,
			job_id:job_id
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/goodmaninfo', ret);			
		})		
});

//人才tab end

//项目tab切换 end
//项目管理 end



//*************人才管理************* start
router.get('/rencai', function(req, res, next){	
	var ret = {};
	common.CopyQuerySession(ret,req);	
	res.render('./goodman/rencai', ret);
});

router.get('/rencaicon', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);	
	var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/talent/candidates',
			body: {
				city:req.query.city, //城市
				company_name:req.query.company_name,				
				function_name:req.query.function_name,
//			groupid:req.query.groupid, //分组id
				company_openid:req.session.company_openid,
				guwen_id:req.query.guwen_id,
				industry:req.query.industry,
				keywd:req.query.keywd,
				phone:req.query.phone,
				username:req.query.username,
				workyears:req.query.workyears
			},
			json: true
		};
		
		rp(options)
			.then(function(parsedBody){
				ret.data=parsedBody;	
				res.render('./goodman/rencaicon', ret);
			})	

});
//	人才库编辑
router.get('/editgoodman', function(req, res, next){
	var ret = res.result;
	var openid = req.query.openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/resume_full_data',
		body: {
			openid:openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./goodman/editgoodman', ret);
		})	
});

//	人才详情 start
router.get('/rencaidetail', function(req, res, next){
	var ret = res.result;
	var result = {};
	var openid = req.query.openid;		  //候选人id	
	console.log('大是大非'+resume_openid);
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/resume_full_data',
		body: {
			openid:openid
		},
		json: true
	};	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			console.log(ret);
			res.render('./goodman/rencaidetail', ret);
		})
});
//	人才详情 end
//*************人才管理************* end

module.exports = router;
