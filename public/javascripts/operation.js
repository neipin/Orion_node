	$(function(){
		//登录
		$(document).on("click","#btnRegist",function() {
			if(checkform("login-container") == false){
	            return;
	        }
			
	        
	        
		    var param = {};
	        var param = new Object();
	        param.param1 = $("#UserName").val();
	        param.param2 = $("#UserPassword").val();
	
	        jQuery.ajax({	   
	            type: 'post',   
	            contentType : 'application/json; charset=utf-8',   
	            dataType: 'json',   
	            url: logic_api_host + "/ajax/actlogin.do",//数据接口
	            data: JSON.stringify(param),   
	            success: function(data){
					if(data.userInfo==""||data.userInfo==undefined){
						$(".form-group").addClass("has-error");
				        $("#UserPassword").siblings(".help-block").text("账号或密码错误！");
				        return
					}
	                Nodesession (data.userInfo);  
	                window.location.href=BaseURL + "/mycustomer";//客户管理 
	            }
	        })
		});
	})

	function Nodesession (userInfo){
		var param = new Object();
		param.userid = userInfo.id;
		param.permission = userInfo.prime_level;
		param.username = userInfo.username;
		param.company_openid = userInfo.company_openid;
		param.role = userInfo.role;
		jQuery.ajax({	   
            type: 'post',   
            contentType : 'application/json; charset=utf-8',   
            dataType: 'json',   
            url: node_url + "/login",
            data: JSON.stringify(param),   
            success: function(data){
                window.location.href=BaseURL + "/mycustomer";//客户管理 
            }
       })
	}



//function Nodesession (userInfo){
//	var param = new Object();
////	param.userid = userInfo.id;		
////	param.permission = userInfo.prime_level;
////	param.username = userInfo.username;
////	param.company_openid = userInfo.company_openid;
////	param.role = userInfo.role;
//	NpAjax.param = JSON.stringify(param);
//	NpAjax.type = "post";
//	NpAjax.url = node_url + "/login";
//	NpAjax.callback=function(data){		
//		window.location.href=BaseURL + "/mycustomer";//客户管理 
//	};
//	NpAjax.ajax();
//}
