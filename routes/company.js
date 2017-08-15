var express = require('express');
var router = express.Router();
var rp = require('request-promise');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('calling /company')
	var flag = req.query.flag;
	var options = {
    method: 'GET',
    uri: 'http://localhost/GDRATS/c/companyList',
    body: {
        param1: '1'
    },
    json: true // Automatically stringifies the body to JSON
	};

	rp(options)
	    .then(function (parsedBody) {
	        // POST succeeded...
          console.log(parsedBody);
          rpdata.companyList = parsedBody.result.companyList;
	        res.render('companyManage', rpdata);
	        // console.log(parsedBody);
	    })
	    .catch(function (err) {
	        // POST failed...
	    });

  // res.json(Mock.mock({
  //       "status": 200,
  //       "data|1-9": [{
  //           "name|5-8": /[a-zA-Z]/,
  //           "id|+1": 1,
  //           "value|0-500": 20
  //       }]
  //   }));

});


router.get('/abc', function(req, res, next) {
  console.log('calling /company/abc')
  var flag = req.query.flag;
  var options = {};
  options.method='GET';
  options.uri='http://localhost/GDRATS/c/companyList';
  var param = {};
  param.param1='1';
  options.body=param;
  options.json=true;

  rp(options)
      .then(function (parsedBody) {
          // POST succeeded...
          console.log(parsedBody);
          rpdata.companyList = parsedBody.result.companyList;
          res.render('companyManage', rpdata);
          // console.log(parsedBody);
      })
      .catch(function (err) {
          // POST failed...
      });

});

module.exports = router;
