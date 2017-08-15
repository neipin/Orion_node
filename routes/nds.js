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

//退出路由 start
router.post('/logout', function(req, res) {//post 用body
	var userid         = "";
	var username       = "";
	var company_openid = "";
	var permission 		 = "";
	
	req.session.userid = userid;
	req.session.username = username;
	req.session.permission = permission;
	req.session.company_openid = company_openid;
	res.end();

});
//退出路由 end

//修改密码 start
router.get('/resetpasswd', function(req, res, next){	
	var ret = res.result;
	res.render('./common/resetpasswd', ret);
});
//	修改密码 end

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
			cp = 1;
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
				res.render('./business/companyManageCon', result);
			})	
});

//客户管理 end

//客户推荐报告 start
router.get('/custom_report', function(req, res, next) {
	var ret = res.result;	
	var options = {
    method: 'POST',
    uri: rpdata.logic_api_host+'/api/custom_report',
    body: {
				company_id: req.query.customer_id,				
				date_from:req.query.date_from,
				date_to:req.query.date_to,
				company_openid:req.session.company_openid
    },
    json: true 
	};
	rp(options)
    .then(function (parsedBody) {	   
    	ret.data=parsedBody;	
    	console.log("客户推荐报告"+parsedBody);
      res.render('./business/custom_report', ret);
    })
});
//客户推荐报告 end

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
			console.log("资料对象"+ret);
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
//	客户管理-合同 end
//	服务负责人 start
		router.get('/service_manager', function(req, res, next){
			var ret = res.result;
			var options = {
				method:'POST',
				uri : rpdata.logic_api_host+'/api/customer/service_fuzeren',
				body: {
					customer_id:req.query.customer_id
				},
				json: true
			};
			
			rp(options)
				.then(function(parsedBody){
					ret.data=parsedBody;	
					res.render('./business/service_manager', ret);
				})	
		});
//	服务负责人end

//项目管理 start
router.get('/project', function(req, res, next){	
	var ret = {};
	common.CopyQuerySession(ret,req);	
	res.render('./project/project', ret);
});

router.get('/projectcon', function(req, res, next){
	var ret = {};
	common.CopyQuerySession(ret,req);	
	var cp = req.query.cp;		
	if(!cp)
	{
		cp = 1;
	}		
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
				func:req.query.func,
				currentPage:cp
			},
			json: true
		};
		
		rp(options)
			.then(function(parsedBody){
				ret.data=parsedBody;	
				res.render('./project/projectcon', ret);
			})	

});

//项目列表right  start
router.get('/project_second', function(req, res, next){
	var ret = res.result;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/jobs/myjobnum',
		body: {
			company_openid:req.session.company_openid,
			userid:req.session.userid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./project/project_second', ret);
		})	

});
//项目列表right  end

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
	var beizhu_type = req.query.beizhu_type;	  //beizhu_type
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/beizhu',
		body: {
			resume_openid:resume_openid,
			beizhu_type:beizhu_type
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

//人才列表right start
router.get('/rencai_second', function(req, res, next){
	var ret = res.result;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/mytalentnum',
		body: {
			company_openid:req.session.company_openid,
			userid:req.session.userid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./goodman/rencai_second', ret);
		})	
});
//人才列表right end

//项目列表right  end
router.get('/rencaicon', function(req, res, next){
	var ret = {};
	var cp = req.query.cp;		
	if(!cp)
	{
		cp = 1;
	}	
	common.CopyQuerySession(ret,req);	
//	console.log("")
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
				workyears:req.query.workyears,
				currentPage:cp
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
	var openid = req.query.openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/detail',
		body: {
			resume_openid:openid
		},
		json: true
	};
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			req.session.jianli_Root_URL = ret.data.jianli_Root_URL;
			res.render('./goodman/rencaidetail', ret);
		})	
});
//	人才详情 end
//人才详情相关项目 start
router.get('/rencaiabout', function(req, res, next){
	var ret = res.result;
	var openid = req.query.openid;	  //候选人openid
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/injobs',//获取候选人已加入的项目
		body: {
			resume_openid:openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			console.log("相关项目"+parsedBody);
			res.render('./goodman/rencaiabout', ret);
		})
});
//人才详情相关项目 end

//人才详情基本信息 start
router.get('/goodmanbaseinfo', function(req, res, next){
	var ret = res.result;
	var openid = req.query.openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/detail',
		body: {
			resume_openid:openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./goodman/goodmanbaseinfo', ret);
		})
});
//附件简历 start
router.get('/goodmanresume', function(req, res, next){
	var ret = res.result;
	var openid = req.query.openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/detail',
		body: {
			resume_openid:openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./goodman/goodmanresume', ret);
		})
});
//附件简历 end

//老简历详情 start
router.get('/goodmanbaseinfo_old', function(req, res, next){
	var ret = res.result;
	var openid = req.query.openid;	  //客户id
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/talent/detail',
		body: {
			resume_openid:openid
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./goodman/goodmanbaseinfo_old', ret);
		})
});
//老简历详情 end
//人才详情基本信息 end

//人才详情备注 start
router.get('/goodmanmemo', function(req, res, next){
	var ret = res.result;
	res.render('./goodman/goodmanmemo', ret);
});
//人才详情备注 end



//*************人才管理************* end


//	**********合伙人 start **********
router.get('/channel_second', function(req, res, next){	
	var ret = {};
	common.CopyQuerySession(ret,req);	
	res.render('./Channel/channel_second', ret);
});

router.get('/Channel_list', function(req, res, next){
	var ret = res.result;
	var company_openid = req.session.company_openid;	//公司openid
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/my_qudao',
		body: {
			company_openid:company_openid				
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
//			rpdata.data=parsedBody;						
//			rpdata.company_openid=company_openid;						
			res.render('./Channel/Channel_list', ret);
	})		
});

//渠道推荐进展 start
router.get('/Channel_progress', function(req, res, next){
	var ret = res.result;
	var cp = req.query.cp;
	if(!cp)
	{
		cp = '1';
	}

	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/channel_jobs_tongji',
		body: {
			channel_openid: req.query.channel_openid,
			date_from:req.query.date_from,
			date_to:req.query.date_to,
			p:cp
		},
		json: true
	};
	
	rp(options)
	.then(function(parsedBody){
		ret.data=parsedBody;			
		res.render('./Channel/Channel_progress', ret);
	})
});
//渠道推荐进展 end

//编辑渠道 start
router.get('/Channel_edit', function(req, res, next){	
	var ret = res.result;
	var master_openid=req.session.company_openid;		
		var options = {
			method:'POST',
			uri : rpdata.logic_api_host+'/api/channel_detail',
			body: {
				channel_openid:req.query.channel_openid	
			},
			json: true
		};
		
		rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./Channel/Channel_edit', ret);
		})		
});
//编辑渠道 end
//渠道详情 start
router.get('/Channel_detail', function(req, res, next){		
	var channel_openid = req.query.channel_openid;//公司openid
//	console.log(channel_openid);
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/channel_detail',
		body: {
			channel_openid:channel_openid				
		},
		json: true
	};
	
	rp(options)
	.then(function(parsedBody){
		rpdata.data=parsedBody;						
//				console.log(parsedBody);
		res.render('./Channel/Channel_detail', rpdata);
	})		
});
//渠道详情  end

//渠道绩效管理 start
router.get('/Channel_jixiao', function(req, res, next) {
	var ret = res.result;
	var cp = req.query.cp;
	if(!cp)
	{
		cp = '1';
	}
	var options = {
    method: 'POST',
    uri: rpdata.logic_api_host+'/api/all_channel_jixiao',
    body: {
    	p:cp,
			date_from:req.query.date_from,//起始日期
			date_to:req.query.date_to,//截止日期		
			company_openid:req.session.company_openid
    },
    json: true // Automatically stringifies the body to JSON
	};

	rp(options)
    .then(function (parsedBody) {	       
      ret.data=parsedBody;	
      console.log("合伙人绩效"+ret);
      res.render('./Channel/Channel_jixiao', ret);
    })
});
//渠道绩效管理  end

//***********合伙人 end********


//***********团队 start**********
router.get('/team_second', function(req, res, next){	
	var ret = {};
	common.CopyQuerySession(ret,req);	
	res.render('./jixiaoMan/team_second', ret);
});
//	*******团队成员 start *******
//	成员列表 start
router.get('/team_member', function(req, res, next){	
	var ret = res.result;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/team/list',
		body: {
			company_openid:req.session.company_openid			
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./jixiaoMan/team_member', ret);
	})
});
//	成员列表 end

//	成员详情 start
router.get('/memberdetail', function(req, res, next){	
	var ret = res.result;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/team/member_detail',
		body: {
			member_id:req.query.member_openid		
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			console.log(ret);
			res.render('./jixiaoMan/memberdetail', ret);
	})
});
//	成员详情 end

//	编辑新增成员 start
router.get('/addmember', function(req, res, next){
	var ret = res.result;
	var options = {
		method:'POST',
		uri : rpdata.logic_api_host+'/api/team/member_detail',
		body: {
			member_id:req.query.member_openid		
		},
		json: true
	};
	
	rp(options)
		.then(function(parsedBody){
			ret.data=parsedBody;	
			res.render('./jixiaoMan/addmember', ret);
	})
});
//	编辑新增成员 end

//	*******团队成员 end *******
//绩效管理 start
router.get('/jixiao', function(req, res, next) {
	var ret = res.result;
	var cp = req.query.cp;
	if(!cp)
	{
		cp = '1';
	}
	var options = {
    method: 'POST',
    uri: rpdata.logic_api_host+'/api/all_guwen_jixiao',
    body: {
			p:cp,
			date_from:req.query.date_from,//起始日期
			date_to: req.query.date_to,//截止日期	
			company_openid:req.session.company_openid
    },
    json: true // Automatically stringifies the body to JSON
	};

	rp(options)
    .then(function (parsedBody) {	       
      ret.data=parsedBody;	
      res.render('./jixiaoMan/jixiao', ret);
    })
});
//绩效管理  end

//我的职位  start
router.get('/myjob', function(req, res, next) {
	var ret = res.result;
	var myjobId=req.query.id;	
	if(myjobId==""||myjobId==undefined){
		myjobId = req.session.userid;
	}else{
		myjobId = req.query.id;
	}

	var options = {
    method: 'POST',
    uri: rpdata.logic_api_host+'/api/guwen_jobs_tongji',
    body: {				
				userid: myjobId,
				date_from:req.query.date_from,
				date_to:req.query.date_to
    },
    json: true // Automatically stringifies the body to JSON
	};

	rp(options)
    .then(function (parsedBody) {	   
    	console.log(parsedBody);
      ret.data=parsedBody;	
      res.render('./jixiaoMan/myjob', ret);
    })	    
});
//我的职位  end

//***********团队 end***********
module.exports = router;
