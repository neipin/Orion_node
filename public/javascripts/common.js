//	初始化子页面 start
	var fnHashTrigger = function(target) {
		var url = window.location.href;
		var modu = url.substring(url.lastIndexOf('/'));
		$(".center-container").html('');
		$(".center-container").html("").load(node_url + modu);	
	};
	if (history.pushState) {
		window.addEventListener("popstate", function() {
			fnHashTrigger();																
	});	
	// 默认载入
	fnHashTrigger();
}
//	初始化子页面 end

$(document).ready(function(){
//	客户和项目管理搜索部分 start
	$(document).on("click",'.popselect-list a',function() {
		$(this).siblings(".popselect-con").show();
		$(this).parents(".popselect-list").siblings(".popselect-list").find(".popselect-con").hide();
	})
//	客户和项目管理搜索部分 end



//	下拉菜单 start
	$(document).on('change', 'select', function() { 
        var val = $(this).find("option:selected").attr("value"); 
        $(this).css("color","#555");
        $(this).siblings("input").val(val);
        $(this).parent("div").siblings("input").val(val);
	}); 
//	下拉菜单 end

//  所有页面点击pushstate start
	$(document).on('click', 'a', function() {
		var nonave = $(this).attr('no-nave');
		if(nonave && nonave != "")
		{
			return;
		}
		var query = this.href;
		var load_div = $(this).attr('target-view');
		var pst = $(this).attr('pushstate');
		$(this).parents("li").addClass("active");
		$(this).parents("li").siblings("li").removeClass("active");
		if(query.indexOf("#")>0){
			return false;
		}
		var module = query.substring(query.lastIndexOf('/'));
		var child_url = node_url + module;
		$("."+load_div).addClass("loading");
		if (history.pushState) {	
			clearTimeout(hoverTimer);  //延迟加载点击的时候，clear一下
			$("."+load_div).html("").load(child_url,function(){
				$("."+load_div).removeClass("loading");
			});
			// history处理
			var title = "Orion-" + $(this).text().replace(/\d+$/, "");
			document.title = title;	
			if(pst == "true")
			{
				history.pushState({ title: title }, title, query);
			}		
			
		}
	
		return false;
	});
//  所有页面点击pushstate end

//	点击空白  start
	$(document).on("click",function(e) {
		var target = $(e.target);
		if (target.closest(".auto-search").length == 0 && target.closest("#customer-search").length == 0) {
			$('.auto-search').hide(); 
		}					
	})
//	点击空白  end
//	*****修改密码 start *****
//	$(".input_zhmm").click(function(){
//		$(this).removeClass("warning");
//		$(this).siblings("p").text("");
//	})
	$('#password1').bind('keypress',function(event){
		if(event.keyCode == "13") { 
			$("#tijiao").click();
		} 
	});
	$('#password2').bind('keypress',function(event){
		if(event.keyCode == "13") { 
			$("#tijiao").click();
		} 
	});
			
	//重置密码提交密码
	$(document).on('click', '#tijiao', function() {
		var tjflg = 0;
		var my_password1=$("#password1").val();
		if(my_password1=="" || my_password1== "请输入新密码"){
			$("#password_tishi_1").show();
			$("#password_tishi_1").text("请输入6-16位密码，字母区分大小写 ");
			$(".form-password1").addClass("has-error");
			tjflg = 0;
			return
		} else if(my_password1.length<6||my_password1.length>16){   
			$(".form-password1").addClass("has-error");
            $("#password_tishi_1").text("请输入6-16位密码，字母区分大小写");
            $("#password_tishi_1").show();
            tjflg = 0;
            return
        }else{
        	tjflg = 1;
//			$("#password_tishi_1").hide();
		}
		var my_password2=$("#password2").val();
		if(my_password2=="" || my_password2=="再次输入密码"){
			$("#password_tishi_2").show();
			$("#password_tishi_2").text("请输入6-16位密码，字母区分大小写");
			$(".form-password2").addClass("has-error");
			tjflg = 0;
			return
		}else if(my_password2.length<6||my_password2.length>16){
			$("#password_tishi_2").show();
			$("#password_tishi_2").text("请输入6-16位密码，字母区分大小写");
			$(".form-password2").addClass("has-error");
			tjflg = 0;
			return
		}else{
			tjflg = 1;
//			$("#password_tishi_2").hide();

		}
		if(my_password1!=my_password2){
			$("#password_tishi_2").show();
			$("#password_tishi_2").text("两次输入的密码不一致，请重新输入");
			$(".form-password2").addClass("has-error");
			tjflg = 0;
			return
		}else{
			tjflg = 1;
//			$("#password_tishi_2").hide();

		}
		if(tjflg == 0){
			return;
		}
		var param = new Object();	
		param.userid=userid;
		param.passwd=my_password1;
		param.confirm_passwd=my_password2;
		jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host +'/api/passwdreset', 			       
	        data: JSON.stringify(param),   
	        success: function(data){
	            if(data.code==0){
	            	$(".stepcommon").hide();
	            	$(".changeok").show();
	            }else{
	            	$("#password_tishi_2").show();
	            	$("#password_tishi_2").text("用户不存在");
	            }
	        }
   		}); 
		
	});
//	*****修改密码 end *****


//	退出 start  logout
	$(document).on('click', '.logout', function() {
		logout();
	})
//	退出 end

})


//错误提示滚动 start
function goDiv(div) {
   var a = $("#"+div).offset().top-120;
   $("html,body").animate({scrollTop:a}, 'slow'); 
}
//错误提示滚动 end
//整个表单check jump start
function jumpToform(divid,jumpid)
{
    var chkret = true;
    $('#'+divid+' .np_form_check').each(function(index,item){
    	var bsid = $(this).siblings(".help-block").attr("id");
    	var bsidselect = $(this).parents(".seles").siblings(".mis_alert").attr("id");
    	 if(bsid==""||bsid==undefined){
        	jumpid.jumpid = bsidselect;
        }else{
        	jumpid.jumpid = bsid;
        	
        }
       
        if(chkret == require_check($(this)))
        {
            if(chkret == length_check($(this)))
            {
                chkret = format_check($(this));
            }
            else
            {
                chkret=false;
                return false;
            }
        }
        else
        {
            chkret=false;
            return false;
        }
    })
    return chkret;
}
//整个表单check jump end

//	简历详情流程函数 start
	function itemflowlist() {
		var recommend_id = $(".itemlist").find("a").attr("recommend_id");  //推荐id
		var param = {};
        param.recommend_id = recommend_id;	// 推荐id	
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/talent/recommend_info";
		ajax.callback=function(data){
			var statusnow = data.status_value;
			$(".itemflow-list").html('').html(template('flow-list', data));
			$(".itemlist_status").find("span").text(statusnow);
		};
		ajax.post();
	}
//	简历详情流程函数 end

//	退出函数 start
function logout(){
    jQuery.ajax({   
        type: 'post',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        url: node_url+"/logout", 
        data: JSON.stringify(new Object()),   
        success: function(data){
            window.location.href = BaseURL;
        }
    });
    window.location.href = BaseURL;
}
//	退出函数 end