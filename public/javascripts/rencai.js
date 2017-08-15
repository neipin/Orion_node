$(function(){
	
//	**********人才搜索 start **********
//	工作经验搜索 start
	$(document).on("click","#btn_workyears",function(){
		var workyears= $(this).siblings(".popselectCon").find("select").val();
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-workyears")) {
			$(".popchoosed-box").find(".popchoosed-workyears").find("span").text(workyears);	
			$(".popchoosed-box").find(".popchoosed-workyears").find("input").val(workyears);
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-workyears">工作经验：<span>'+workyears+'</span><em>&times;</em><input type="hidden" value='+workyears+'></div>');					
		}
	})
//	工作经验搜索 end
//	姓名搜索 start
$(document).on("click","#btn_namesearch",function(){
	var name= $(this).siblings(".popselectCon").find("input").val();
	$(this).parents(".popselect-con").hide();
	if($(".popchoosed-list").hasClass("popchoosed-username")) {
		$(".popchoosed-box").find(".popchoosed-username").find("span").text(name);	
		$(".popchoosed-box").find(".popchoosed-username").find("input").val(name);
	} else {
		$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-username">姓名：<span>'+name+'</span><em>&times;</em><input type="hidden" value='+name+'></div>');					
	}
})
//	姓名搜索 end

//	手机号码搜索 start
$(document).on("click","#btn_phonesearch",function(){
	var phone= $(this).siblings(".popselectCon").find("input").val();
	$(this).parents(".popselect-con").hide();
	if($(".popchoosed-list").hasClass("popchoosed-phone")) {
		$(".popchoosed-box").find(".popchoosed-phone").find("span").text(phone);	
		$(".popchoosed-box").find(".popchoosed-phone").find("input").val(phone);
	} else {
		$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-phone">手机号码：<span>'+phone+'</span><em>&times;</em><input type="hidden" value='+phone+'></div>');					
	}
})
//	手机号码搜索 end

//	行业搜索 start
$(document).on("click","#rc_btn_industry",function(){
	var industry= $(this).siblings(".popselectCon").find("input").val();
	$(this).parents(".popselect-con").hide();
	if($(".popchoosed-list").hasClass("popchoosed-industry")) {
		$(".popchoosed-box").find(".popchoosed-industry").find("span").text(industry);	
		$(".popchoosed-box").find(".popchoosed-industry").find("input").val(industry);
	} else {
		$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-industry">行业：<span>'+industry+'</span><em>&times;</em><input type="hidden" value='+industry+'></div>');					
	}
})
//	行业搜索 end

//	公司名称搜索 start
$(document).on("click","#btn_gsnamesearch",function(){
	var gsname= $(this).siblings(".popselectCon").find("input").val();
	$(this).parents(".popselect-con").hide();
	if($(".popchoosed-list").hasClass("popchoosed-company_name")) {
		$(".popchoosed-box").find(".popchoosed-company_name").find("span").text(gsname);	
		$(".popchoosed-box").find(".popchoosed-company_name").find("input").val(gsname);
	} else {
		$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-company_name">公司名称：<span>'+gsname+'</span><em>&times;</em><input type="hidden" value='+gsname+'></div>');					
	}
})
//	公司名称搜索 end

//	项目关键词搜索 start
$(document).on("click","#rc_btn_search,#rc_btn_citysearch,#rc_btn_title,#btn_workyears,#btn_namesearch,#btn_phonesearch,#rc_btn_industry,#btn_gsnamesearch,.rc-popchoosed-box em",function(){
	var searchtag = $("#searchtag").val();//查询公司名
	var city = $(".popchoosed-procity").find("input").val();//查询城市
	var title = $(".popchoosed-title").find("input").val();//查询职能
	var workyears = $(".popchoosed-workyears").find("input").val();//查询工作年限	
	var username = $(".popchoosed-username").find("input").val();//查询姓名
	var phone = $(".popchoosed-phone").find("input").val();//查询手机号码
	var company_name = $(".popchoosed-company_name").find("input").val();//查询公司名称
	var industry = $(".popchoosed-industry").find("input").val();//查询行业
	if(searchtag==''||searchtag==undefined){
		searchtag='';
	}
	if(city==''||city==undefined){
		city='';
	}
	if(workyears==''||workyears==undefined){
		workyears='';
	}
	if(title==''||title==undefined){
		title='';
	}
	if(username==''||username==undefined){
		username='';
	}
	if(phone==''||phone==undefined){
		phone='';
	}
	if(company_name==''||company_name==undefined){
		company_name='';
	}
	if(industry==''||industry==undefined){
		industry='';
	}
	OrionJump('.goodmancon','/rencai?keywd='+searchtag+'&city='+city+'&guwen_id='+guwen_id+'&workyears='+workyears+'&function_name='+title+'&company_name='+company_name+'&phone='+phone+'&username='+username+'&industry='+industry,false);
})
//	项目关键词搜索 end

//	********** 人才搜索 end **********

//	加入新项目 start
	$(document).on("click","#addnewitem",function(){		
		var param = {};
        param.resume_openid = openid;	// 候选人id	
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/talent/injobs";
		ajax.callback=function(data){
			$("#newitemModal").html('').html(template('tpl_newitemmould',data));
		};
		ajax.post();
	})
//	加入新项目 end	

//	模糊搜索项目 start
//	input鼠标离开如果id为空,input附空
	$(document).on('blur', '#newitem_search', function() {
		var companyid = $("#companyid").val();
		if(companyid=="") {
			$('#newitem_search').val("");
		}
	})
	$(document).on('click', '#newitem_search', function() { 
		var $this = $(this);
		var param = new Object();
	    param.keywd = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	    param.company_openid = company_openid;
	    jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host+'/api/myjobs', 
	        data: JSON.stringify(param),   
	        success: function(data){
                if(data.jobList.length > 0){
                	setTimeout(function(){
                         $this.siblings(".auto-search").slideDown();
	                },500);
	                $this.siblings(".auto-search").find(".auto-search-ul").html("");
                    $this.siblings(".auto-search").find(".auto-search-ul").show();
                     var length = data.jobList.length;
                      for(var i=0;i<length;i++){
              			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" gzjl_id='+data.jobList[i].job_id+'>'+data.jobList[i].job_name+'-'+data.jobList[i].company_name+'</li>');
                      }
                  }else{
                      $this.siblings(".auto-search").hide();
                  }
	          }
	     });
	});
	
	$(document).on('keyup', '#newitem_search', function(event) { 
		lastTime = event.timeStamp;
		var $this = $(this);
		$("#companyid").val("");
		if ((event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {  
			selectItem_gsname(event);
			if(event.keyCode == 13){
	         	$this.siblings(".auto-search").hide();
	         	$this.siblings(".auto-search").find(".auto-search-ul").html("");
	         	$("#newitem_search").val(company_name);
	         	$("#companyid").val(company_id);
			}
			return;
		}
		var content = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	  	if(content == "" || (oldContent == "" && content == oldContent)){
	        oldContent = "";
	        $this.siblings(".auto-search").hide();
	        return;//没有输入内容或者文本内容没有发生变化时就返回
	    }
	    oldContent = content;
	    var param = new Object();
	    param.keywd = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	    param.company_openid = company_openid;
	    jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host+'/api/myjobs', 
	        data: JSON.stringify(param),   
	        success: function(data){
                if(data.jobList.length > 0){
                	setTimeout(function(){
	                	if(lastTime-event.timeStamp == 0){
	                        $this.siblings(".auto-search").slideDown();
	        			}
	                },500);
	                $this.siblings(".auto-search").find(".auto-search-ul").html("");
                    $this.siblings(".auto-search").find(".auto-search-ul").show();
                    var length = data.jobList.length;
//                  if(length > 6){
//                      length = 6;
//                  }
                    for(var i=0;i<length;i++){
              			$this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" gzjl_id='+data.jobList[i].job_id+'>'+data.jobList[i].job_name+'-'+data.jobList[i].company_name+'</li>');
                    }
                  }else{
                      $this.siblings(".auto-search").hide();
                  }
	          }
	     });
	});
//	确定加入项目 start
	$(document).on("click",".btn_additem",function(){
		var param = {};
        param.job_id = $("#companyid").val();	// 项目id	
        if(param.job_id=="") {
        	$(".choose_item").addClass("has-error").find(".help-block").text("请选择一个项目");
        	return
        }
        param.member_id = userid;				// 操作者id	
        param.resume_openid = openid;	// 候选人openidid	
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/talent/addtojob";
		ajax.callback=function(data){
			if(data.code=="1") {
				$(".choose_item").addClass("has-error").find(".help-block").text("不能重复加入项目");
        		return		
			}else{
				$(".close").click();
				OrionJump('.aboutitem','/rencaiabout?openid='+openid,false,function(){
					$(".modal-backdrop").remove();
				});
			}
		};
		ajax.post();
	})
//	确定加入项目 end
	$(document).on("click","#newitem_search",function(){
		$(this).parents(".choose_item").removeClass("has-error");
	})
	
//	操作中添加备注 start
	$(document).on("click",".addmemo",function(){
		$(".remarks-modal").html('').html(template('tpl_remarksmould',{}));
	})
//	操作中添加备注 end
	
//	模糊搜索项目 end
})
