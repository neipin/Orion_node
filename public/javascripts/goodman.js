var screenwidth = document.body.scrollWidth*(4/5);
var screenheight = document.body.scrollHeight*(4/5);
function hideflowlist(){
	if(hoverflag1==0&&hoverflag2==0){
		$(".flow-list").hide();		
	}
}
	var hoverflag1 = 0;//span
	var hoverflag2 = 0;//flow-list
	$(function(){
//		人选流程鼠标滑过 start	
		$(document).on('mouseover', '.td-pos span.btn-flow', function() {
			hoverflag1 = 1;
			if($(".flow-list").is(":visible")){
				return false;
			}
			
			var recommend_id = $(this).parents("tr").attr("recommend_id");
			var $this = $(this);
			var param = {};
	        param.recommend_id = recommend_id;	// 推荐id	
	        
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/recommend_info";
			ajax.callback=function(data){
				$this.siblings(".flow-list").show();
            	$(".flow-list").html('').html(template('flow-list', data));
            	$this.parents(".td-pos").css({"z-index":"2"});
            	$this.parents("tr").siblings("tr").find(".flow-list").hide();
            	$this.parents("tr").siblings("tr").find(".td-pos").css({"z-index":"1"});
			};
			ajax.post();			
		})
		$(document).on('mouseleave', '.td-pos span', function() {
			hoverflag1=0;
			setTimeout('hideflowlist()',100);
		})
		$(document).on('mouseover', '.flow-list', function() {
			hoverflag2=1;
			$(this).show();
		})
		$(document).on('mouseleave', '.flow-list', function() {
			hoverflag2=0;
			setTimeout('hideflowlist()',100);
		})
//		人选流程鼠标滑过 end



//		推荐/面试offer入职淘汰下拉选择事件 start
		$(document).on("click",".dropdown-mianshi a,#status_span3",function() {
			$("#interviewModal").html('').html(template('tpl_interview'));
	        time_ymdhm();			 
		})	
		$(document).on("click",".flow-mianshiedit",function() {
			var feed_id = $(this).parents(".row").attr("feed_id");	//????????	
			var param = {};
	        param.feed_id = feed_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/getmianshi";
			ajax.callback=function(data){
				$("#interviewModal").html('').html(template('tpl_interview', data));
	            time_ymdhm();
			};
			ajax.post();
		})	
		
//		offer start
		$(document).on("click",".dropdown-offer a,#status_span4",function() {
			$("#offerModal").html('').html(template('tpl_offer'));
			$(".label_radio :radio").eq(0).click();
	        time_ymd();
		})
//		人才流程中offer编辑 start
		$(document).on("click",".flow-offeredit",function() {
			var feed_id = $(this).parents(".row").attr("feed_id");	//????????
			var param = {};
	        param.feed_id = feed_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/getoffer";
			ajax.callback=function(data){
				$("#offerModal").html('').html(template('tpl_offer', data));
	            time_ymd();
			};
			ajax.post();
		})	
//		人才流程中offer编辑 end		
//		offer end
//		人才流程中入职 编辑start
		$(document).on("click",".dropdown-ruzhi a,#status_span9",function() {
			$("#ruzhiModal").html('').html(template('tpl_ruzhi'));			
			$("#ruzhiModal").find("span.candidate").text(hovercandidate);
	        time_ymd();
		})
		$(document).on("click",".flow-ruzhiedit",function() {
			var feed_id = $(this).parents(".row").attr("feed_id");	//		
			var param = {};
	        param.feed_id = feed_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/getruzhi";
			ajax.callback=function(data){
				$("#ruzhiModal").html('').html(template('tpl_ruzhi', data));
				$(".candidate").text(hovercandidate);//	入职传候选人姓名 
	            time_ymd();
			};
			ajax.post();	        
		})	
//		人才流程中入职 编辑 end
//		人才流程中淘汰 编辑 start
		$(document).on("click",".dropdown-taotai a,#status_span10",function() {
			$("#taotaiModal").html('').html(template('tpl_taotai'));
			$(".label_radio :radio").eq(0).click();
	        time_ymd();
		})
		$(document).on("click",".flow-taotaiedit",function() {
			var feed_id = $(this).parents(".row").attr("feed_id");	//????????	
			if(feed_id==undefined){
				feed_id='';
			}
			var param = {};
	        param.feed_id = feed_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/getTaotai";
			ajax.callback=function(data){
				$("#taotaiModal").html('').html(template('tpl_taotai', data));
	            time_ymd();
			};
			ajax.post();	        
		})	
//		人才流程中淘汰 编辑 end
//		推荐/面试offer入职淘汰下拉选择事件 end

	
//		人才操作 end
//		点击推荐 start
		$(document).on('click', '.btn-tuijian', function() {
			var recommend_id = $("#tuijianModal").attr("recommend_id"); //推荐id
			var param = {};
	        param.member_id = userid;	// 操作者id
	        param.recommend_id = recommend_id;	//	推荐id
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/recommend";			
			ajax.callback=function(data){
				$(".close").click();
				if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
				} else {
					OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
						$(".modal-backdrop").remove();
						$('#goodmanTab').find("a").eq(2).click();	
						time_ymd();
	            	});	    
	            }
			};
		ajax.post();		        			
		})
//		点击推荐 end	
//		点击确定面试 start
		$(document).on('click', '.btn-interview', function() {
			var feed_id =$("#interviewModal").attr("feed_id");; //操作者id		
			if(checkform("interview-checkbox") == false)
	        {
	            return false
	        }
	        var param = {};
	        param = $("#interview-checkbox").serializeObject ();	
	        param.recommend_id = hoverrecommend_id;	//推荐id
	        param.feed_id = feed_id;	
	        param.member_id = userid;	//操作者id	        
	        var ajax = new NpAjax();
	        ajax.param = param;
	        if(feed_id&&feed_id!=""){ //编辑保存
				ajax.url = "/api/talent/update_mianshi";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							time_ymdhm();
		            	});	
					}
					  
				};
			}else {
				ajax.url = "/api/talent/mianshi";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							$('#goodmanTab').find("a").eq(3).click();	
							time_ymdhm();
		            	});	
		           }
				};
			}			
			ajax.post();
		})
//点击确定面试 end
//offer状态 start
		var radioindex ='0'; 
		$(document).on('click', '.label_radio :radio', function() {
			var str = $(this).val();
			if(str=="待定") {
				$(this).parents(".form-group").siblings(".radio-con").find("label").html("<span>*</span>待定时间：");
				$(this).parents(".form-group").siblings(".radio-con").find("input").prop({"name":"daiding_date","placeholder":"请输入待定时间"});
				radioindex = 0;
				
			} else if (str=="接受") {
				$(this).parents(".form-group").siblings(".radio-con").find("label").html("<span>*</span>预计入职时间：");
				$(this).parents(".form-group").siblings(".radio-con").find("input").prop({"name":"ruzhi_date","placeholder":"请输入预计入职时间"});
				radioindex = 1;
				
			}else if (str=="拒绝") {
				$(this).parents(".form-group").siblings(".radio-con").find("label").html("<span>*</span>拒绝时间：");
				$(this).parents(".form-group").siblings(".radio-con").find("input").prop({"name":"reject_date","placeholder":"请输入拒绝时间"});
				radioindex = 2;
			}
			return radioindex;
		})	
//offer状态 end
		$(document).on('click', '.btn-offer', function() {	
			var feed_id =$("#offerModal").attr("feed_id");; //操作者id	
			var offer_status = radioindex;
			if(checkform("offer-checkbox") == false)
	        {
	            return false
	        }	 
	        var param = {};	   
	        param = $("#offer-checkbox").serializeObject ();	
	        param.recommend_id = hoverrecommend_id;	//推荐id
	        param.offer_status = offer_status;	//offer状态 0：待定；1：接受；2：拒绝	 
        	param.feed_id = feed_id; //
        	param.member_id = userid;	//操作者id
	        var ajax = new NpAjax();
	        ajax.param = param;
	        if(feed_id&&feed_id!=""){ //编辑保存
				ajax.url = "/api/talent/update_offer";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							time_ymd();
		            	});	
					}
				};
			}else {
				ajax.url = "/api/talent/offer";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							$('#goodmanTab').find("a").eq(4).click();	
							time_ymd();
		            	});	
		            }
				};
			}
			
			ajax.post();
		})
//入职状态 start
		$(document).on('click', '.btn-ruzhi', function() {
			var feed_id =$("#ruzhiModal").attr("feed_id");; //操作者id				
			if(checkform("ruzhi-checkbox") == false)
		    {
		        return false
		    }
		    var param = {};
		    param = $("#ruzhi-checkbox").serializeObject ();	
		    param.recommend_id = hoverrecommend_id;	//推荐id
		    param.feed_id = feed_id;//feed_id
		    param.member_id = userid;	//操作者id
		    var ajax = new NpAjax();
	        ajax.param = param;
	        if(feed_id&&feed_id!=""){ //编辑保存
				ajax.url = "/api/talent/update_ruzhi";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							time_ymd();
		            	});
		            }
				};
	        }else {
				ajax.url = "/api/talent/ruzhi";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							$('#goodmanTab').find("a").eq(5).click();	
							time_ymd();
		            	});	  
		            }
				};
			}			
			
			ajax.post();
		})
//入职状态 end
		var taotaiindex ='1'; 
		$(document).on('click', '.taotai_radio :radio', function() {
			var str = $(this).val();
			if(str=="备选") {
				taotaiindex = 1;
				
			} else if (str=="客户淘汰") {			
				taotaiindex = 2;
				
			}else if (str=="候选人拒绝") {			
				taotaiindex = 3;
			}
			return taotaiindex;
		})
//淘汰状态 start
		$(document).on('click', '.btn-taotai', function() {
			var feed_id =$("#taotaiModal").attr("feed_id");; //操作者id	
			if(checkform("taotai-checkbox") == false)
		    {
		        return false
		    }
		    var param = {};
		    param = $("#taotai-checkbox").serializeObject ();	
		    param.recommend_id = hoverrecommend_id;	//推荐id
		    param.failed_type = taotaiindex;	//淘汰类型 1：备选；2：客户淘汰；3：候选人拒绝
		    param.feed_id = feed_id;//feed_id
		    param.member_id = userid;	//操作者id
		    var ajax = new NpAjax();
	        ajax.param = param;
	        if(feed_id&&feed_id!=""){ //编辑保存
				ajax.url = "/api/talent/update_failed";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							time_ymd();
		            	});	 
		            }
				};
			}else {
				ajax.url = "/api/talent/failed";
				ajax.callback=function(data){
					$(".close").click();
					if($(".itemlistbox").length > 0 ) {//简历详情判断
						itemflowlist();
					} else {
						OrionJump('.tab-pane','/goodman?job_id='+job_id,false,function(){
							$(".modal-backdrop").remove();
							$('#goodmanTab').find("a").eq(6).click();	
							time_ymd();
		            	});	 
		            }
				};
			}
			
			ajax.post(); 
		})
//	淘汰状态 end
//	生成推荐报告 start
	$(document).on('click', '.dropdown-report a', function() {
		var param = {};
        param.company_openid = company_openid;
        param.resume_openid = $(this).attr("data-recommend_id");
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/getRmdTempalates";
		ajax.callback=function(data){
			$("#reportModal").html('').html(template('tpl_report', data));
		};
		ajax.post();
	})
	$(document).on("click",".choosemould span",function(){	
		$(this).siblings("ul").slideToggle();
	})
	$(document).on("click",".choosemould li",function(){
		var con = $(this).text();
		var id = $(this).attr("id");
		$(this).parents("ul").siblings("span").addClass("active").text(con);
		$(this).parents("ul").siblings("span").attr("tpl_id",id);
		$(this).parents("ul").siblings("a").show();
		$(this).parents("ul").slideUp();
	})
//	生成推荐报告 end
//	点击下载推荐报告 start
	$(document).on("click",".btn-report",function(){			
		var tpl_id = $(".select-report").val();
		var resume_openid = $("#reportModal").attr("recommend_id");
		if(!tpl_id||tpl_id=="") {
			$("#reportModal").find(".modal-body").addClass("has-error");
			$(".select-report").siblings(".help-block").text("请选择推荐报告模板");
		}
		window.open(logic_api_host + "/api/generateRmdrpt?guwen_id="+userid+"&job_id="+job_id+"&resume_openid="+resume_openid+"&tpl_id="+tpl_id);
		$(".close").click();

	})
//点击下载推荐报告 end
//**********************备注 start*********************	
//	备注类型 start
		$(document).on('change', '.beizhu_type', function() { 
	        var val = $(this).find("option:selected").attr("value"); 
	        if(val=='2') {
	        	$(".mianshiresultCon").show();
	        }else {
	        	$(".mianshiresultCon").hide();
	        }
		}); 
//	备注类型 end
//	新增备注 start
	$(document).on("click","#addbeizhubtn",function() {
		$(".remarks-modal").html('').html(template('tpl_remarksmould',{}));
	})
//	新增备注 end
//		编辑备注 start
		$(document).on("click",".remarks-operate .btn-primary",function() {
			$(".remarks-modal").html('').html(template('tpl_remarksmould'));
			var beizhu_id = $(this).attr("data-beizhuid");
			var param = {};
	        var param = new Object();
	        param.beizhu_id = beizhu_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
	        ajax.url = "/api/talent/editbeizhu";
			ajax.callback=function(data){
				$(".remarks-modal").html('').html(template('tpl_remarksmould', data));
			};
			ajax.post(); 
		})		
//		编辑备注 start
//删除备注 start
		$(document).on("click",".remarks-operate .btn-danger",function() {
			var r = confirm("确定删除这个备注吗？");
		    if(r==true) {
				var beizhu_id = $(this).parents(".remarksList-right").find(".remarkscon").attr("beizhu_id"); //备注id
				var param = {};
			    param.beizhu_id = beizhu_id;
			    param.user_id = userid;
			    var ajax = new NpAjax();
		        ajax.param = param;
				ajax.url = "/api/talent/delbeizhu";
				ajax.callback=function(data){
					OrionJump('#popFrmdemo','/remarks?resume_openid='+hoverresume_openid,false,function(){
						$(".modal-backdrop").remove();							
					});
				};
				ajax.post();
			    	
			} else {
	            		return false
	            	}	
		})		
//删除备注 end

//保存备注 start
		$(document).on("click",".remarks-save",function() {
			if(checkform("editbeizhu") == false) 
	        {
	            return false
	        }
			var beizhu_id = $(this).parents(".remarks-modal").attr("beizhuid"); //备注id
			var param = {};
		    param=$(".editbeizhu").serializeObject ();	
		    param.beizhu_id = beizhu_id;
		    param.resume_openid = hoverresume_openid;
		    param.userid = userid; //创建者id
		    var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/talent/savebeizhu";			
			ajax.callback=function(data){
				$(".close").click();
				if($('#popFrmdemo').length>0){
					OrionJump('#popFrmdemo','/remarks?resume_openid='+hoverresume_openid,false,function(){
			        	$(".modal-backdrop").remove();
			        });
				}else{
					OrionJump('.center-container','/rencaidetail?openid='+hoverresume_openid+'&bzflag=1',false,function(){
			        	
			        	$(".modal-backdrop").remove();
			        });
				}
		        
			};
			ajax.post();		   		 
		})
//保存备注 end
//备注tab切换 start
	$(document).on("click",".memoTab a",function() {
		$(this).addClass("active");
		$(this).siblings("a").removeClass("active");
	})
//备注tab切换 end
//**********************备注 end*********************

//调整窗口时简历详情和备注的大小 start
	$(window).resize(function() {
//	  $(".popMain")
	});
//调整窗口时简历详情和备注的大小 end
})
//时间初始化
	
//	时间 年、月、日start（面试时间）
function time_ymdhm(){
	$('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2, //这里就设置了默认视图为年视图
//	        minView: 4, //设置最小视图为年视图
        forceParse: 0,
        minuteStep: 30
   	});
}
	
//	时间 年、月、日 end	

//	时间 年、月、日、时分start(入职时间)
function time_ymd(){
	$('.form_date').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2, //这里就设置了默认视图为年视图
	    minView: 4, //设置最小视图为年视图
        forceParse: 0
   	});
}	
//	时间 年、月、日、时分 end	
