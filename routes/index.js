var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var Mock = require('mockjs');

Mock.mock('/ajax/getHotJobs.do', {
    'meta_title'	   : '[@name](/user/name)()',
    'age|1-100': 100,
    'color'	   : '[@color](/user/color)'
});



//首页 start
router.get('/bench', function(req, res, next){	
	var ret = res.result;
	res.render('./common/workspace',ret);	
		
});
//首页 end

//客户管理 start
router.get('/mycustomer', function(req, res, next){		
	var ret = res.result;	
	res.render('./common/workspace',ret);
		
});
//客户管理 end
//公司详情 start
router.get('/companydetail', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);
		
});
//公司详情 end
//编辑、添加公司信息start
router.get('/editcompany', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);
		
});
//编辑、添加公司信息 end

//项目管理 start
router.get('/project_second', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);		
});
//项目编辑 start
router.get('/editproject', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//项目编辑 end
//项目详情 start
router.get('/projectdetail', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);
		
});
//项目详情 end
//项目管理 end
//人才库 start
router.get('/rencai_second', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);		
});
//人才编辑 start
//router.get('/rencai', function(req, res, next){
//	var ret = res.result;
//	res.render('./common/workspace',ret);		
//});
router.get('/editgoodman', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//人才编辑 end
//	人才详情 start
router.get('/rencaidetail', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	人才详情 end
//人才库 end
//	*******合伙人 start *******
//	合伙人列表	start
router.get('/channel_second', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	合伙人列表	end

//	合伙人编辑	start
router.get('/Channel_edit', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	合伙人编辑	end  

//	合伙人详情 start
router.get('/Channel_detail', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	合伙人详情 end

//	合伙人进展	start
router.get('/Channel_progress', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	合伙人进展	end  

//	*******合伙人 end *******

//	*******团队 start *******
router.get('/team_second', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	成员详情 start
router.get('/memberdetail', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	成员详情 end
router.get('/myjob', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});

//	编辑新增成员 start
router.get('/addmember', function(req, res, next){
	var ret = res.result;
	res.render('./common/workspace',ret);	
});
//	编辑新增成员 end

//	*******团队 end *******
//	登录 start
router.get('/', function(req, res, next){
	var ret = res.result;
	res.render('./common/login',ret);
		
});
//	登录 end

//	修改密码 start
router.get('/resetpasswd', function(req, res, next){	
	var ret = res.result;
	res.render('./common/workspace', ret);
});
//	修改密码 end
module.exports = router;
