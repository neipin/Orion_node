$(function(){
	//城市搜索
	$(document).on("click",".btn-citysearch",function(){
		var citycon="";  
		$("#dis_location").find(".i_city").each(function(){
			citycon+= $(this).find("span").text()+',';			
		})
		citycon=(citycon.slice(citycon.length-1)==',')?citycon.slice(0,-1):citycon;
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-city")) {
			$(".popchoosed-box").find(".popchoosed-city").find("span").text(citycon);
			$(".popchoosed-box").find(".popchoosed-city").find("input").val(citycon);
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-city">城市：<span>'+citycon+'</span><em>&times;</em><input type="hidden" value='+citycon+'></div>');					
		}
	})
   	
	//客户状态
	$(document).on("click",".btn-statussearch",function(){	
		var statuscon= $(this).siblings(".popselectCon").find("select").val();
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-status")) {
			$(".popchoosed-box").find(".popchoosed-status").find("span").text(statuscon);	
			$(".popchoosed-box").find(".popchoosed-status").find("input").val(statuscon);	
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-status">客户状态：<span>'+statuscon+'</span><em>&times;</em><input type="hidden" value='+statuscon+'></div>');					
		}
	})
//	删除搜索项 start
	$(document).on("click",".popchoosed-list em",function(){
		$(this).parents(".popchoosed-list").remove();
	})
//	删除搜索项 end

//客户管理页面搜素 start
//	客户关键词搜索 start
	$(document).on("click","#btn_search,#btn-citysearch,#btn-statussearch,.popchoosed-city em,.popchoosed-status em",function(){
		var searchtag = $("#searchtag").val();//查询公司名
		var city = $(".popchoosed-city").find("input").val();//查询城市
		var status = $(".popchoosed-status").find("input").val();//查询客户状态
		if(searchtag==''||searchtag==undefined){
			searchtag='';
		}
		if(city==''||city==undefined){
			city='';
		}
		if(status==''||status==undefined){
			status='';
		}
		OrionJump('.center-container','/mycustomer?searchtag='+searchtag+'&city='+city+"&status="+status,true);
	})
//	客户关键词搜索 end
//客户管理页面搜素 end

//	*********  客户资料页面 datum.ejs  start********
//		删除资料 start
		$(document).on('click', '.data-list em', function() { 
			var $this = $(this);
			var change_url = node_url+'/companydetail';
			var param = {};
	        param.userid = $(this).parents(".data-list").attr("id");   //操作者id
	        param.ziliao_id = $(this).parents(".data-list").attr("name");	 //资料id
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/customer/delziliao";
			ajax.callback=function(data){
				OrionJump('.center-container','/companydetail?customer_id='+job_id,false);
				$('#maintab').find("a").eq(2).click();
			};
			ajax.post();	        
		})
//		删除资料 start
//	*********  客户资料页面 datum.ejs  end ********

//	*********客户管理沟通记录 start*********
//	添加沟通记录 start
	$(document).on("click","#add-communite",function() {
		$("#modal-khcommunite").html('').html(template('tpl_khcommunitemould'));
	})
//	添加沟通记录 end
//	编辑沟通记录
	$(document).on('click', '.khcommuite-edit', function() {
		$("#modal-khcommunite").html('').html(template('tpl_khcommunitemould'));
		var comm_id =$(this).parents(".communication-list").attr("id");
		var param = {};
        param.comm_id = comm_id;	//沟通记录id
		var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/customer/getcomm";
		ajax.callback=function(data){
			$("#modal-khcommunite").html('').html(template('tpl_khcommunitemould',data));
		};
		ajax.post();	        
	})			

	$(document).on('mouseover', '.communication-list', function() {
		$(this).addClass("hover-bg").find(".commuite-operate").show();
	})
	$(document).on('mouseout', '.communication-list', function() {
		$(this).removeClass("hover-bg").find(".commuite-operate").hide();
	})
			
			
//	删除聊天记录
	$(document).on('click', '.khcommuite-del', function() {
		var r = confirm("确定删除此沟通记录？");
		if(r==true) {
			var comm_id =$(this).parents(".communication-list").attr("id");
			var param = {};
	        param.comm_id = comm_id;	//沟通记录id
	        param.member_id = userid;	//操作者id	
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/customer/delcomm";
			ajax.callback=function(data){
				$(".close").click();
				OrionJump('.center-container','/companydetail?customer_id='+customer_id,false,function(){
					$('#maintab a').eq(3).click();
					$(".modal-backdrop").remove();
				});						
			};
			ajax.post();	        
        } else {
    		return false
    	}	
	})
//		保存客户沟通记录 start
	$(document).on("click",".customer-communite-save",function() {
		var comm_id = $("#modal-khcommunite").attr("comm_id"); //	沟通记录id
		var content = $(this).parents(".modal-footer").siblings(".modal-body").find("textarea").val(); //沟通内容
		var param = {};
        param.comm_id = comm_id;
        param.content = content;
        param.member_id = userid;
        param.customer_id = customer_id;
		if(content==""){
        	$(".modal").modal("hide");
        	$(".modal-backdrop").remove();
        	return false;
        }
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/customer/savecomm";
		ajax.callback=function(data){
			$(".close").click();
			OrionJump('.center-container','/companydetail?customer_id='+param.customer_id,false,function(){
				$(".modal-backdrop").remove();
				$('#maintab a').eq(3).click();
			});				
			
		};
		ajax.post();
	})
//		保存客户沟通记录 end
	
//	*********客户管理沟记录通 end*********

//*********客户服务负责人 start*********
	$(document).on('click', '.fuzeren_del', function() {	
		var $this = $(this);
		var r = confirm("确定删除此负责人？");
		if (r==true) {
			var channel_openid = $this.parents("tr").prop("id"); //渠道openid 
			var fuzeren_kbn = $this.parents("tr").attr("fuzeren_kbn");  //1:内部渠道；2：外部渠道
			var param = {};
	        param.channel_openid = channel_openid;
	        param.customer_id = customer_id;
	        var ajax = new NpAjax();
	        ajax.param = param;	        
	        if(fuzeren_kbn=="1"){//内部渠道
	        	ajax.url = "/api/customer/rm_neibufenpai";
	        } 
	        if (fuzeren_kbn=="2"){//外部渠道
	        	ajax.url = "/api/rm_customer_channel";
	        }
			ajax.callback=function(data){
	        	OrionJump('.tab-pane','/companydetail?customer_id='+customer_id,false,function(){
					$('#maintab').find("a").eq(5).click();	
	        	});
			};
			ajax.post();		        
		}
	})
//	保存渠道 start
	$(document).on('click', '.qudao-save', function() {	
		var gc_id = $("#gc_id").val(); //内部或外部渠道openid
		var fuzeren_kbn = $(this).parents(".modal-footer").siblings(".modal-body").find("li.active").attr("value");  //1:内部渠道；2：外部渠道
		if(gc_id=="") {
			$(this).parents(".modal-footer").siblings(".modal-body").find(".alert").html("请搜索内部渠道或外部渠道，并选择！").show();
			return false;
		}
        var param = {};
        if(fuzeren_kbn=="1"){//内部渠道
        	param.customer_id = customer_id;
	        param.userid = gc_id;
	        var ajax = new NpAjax();
	        ajax.param = param;	        
        	ajax.url = "/api/customer/neibufenpai";
        } else if (fuzeren_kbn=="2"){//外部渠道
        	param.channel_openid = gc_id;
        	param.customer_id = customer_id;
        	var ajax = new NpAjax();
	        ajax.param = param;	
        	ajax.url = "/api/customer2channel";
        }
		ajax.callback=function(data){
			$(".modal-backdrop").remove();
        	OrionJump('.tab-pane','/companydetail?customer_id='+customer_id,false,function(){
				$('#maintab').find("a").eq(5).click();	
        	});
		};
		ajax.post();	        	
	})
//	保存渠道 end

//*********客户服务负责人 end*********

//		推荐报告确定按钮 start
			$(document).on('click', '.reportdatabtn', function() {
				var data1 = $(this).parents(".time_search").find("#data1").val();
				var data2 = $(this).parents(".time_search").find("#data2").val();
				if(moment(data1)>moment(data2)){
					alert("开始时间不能大于结束时间");
					return;
				}
				OrionJump('.tab-pane','/custom_report?customer_id='+cr_customer_id+'&date_from='+data1+'&date_to='+data2,false);	
			})	
//		推荐报告确定按钮 end
})

function search()
    {
     	if (event.keyCode == "13") {
     		$("#btn_search").click();
     	}
    }