$(function(){
//	城市搜索 start
	$(document).on("click","#pro_btn_citysearch,#rc_btn_citysearch",function(){
		var citycon="";  
		$("#dis_location").find(".i_city").each(function(){
			citycon+= $(this).find("span").text()+',';			
		})
		citycon=(citycon.slice(citycon.length-1)==',')?citycon.slice(0,-1):citycon;
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-procity")) {
			$(".popchoosed-box").find(".popchoosed-procity").find("span").text(citycon);	
			$(".popchoosed-box").find(".popchoosed-procity").find("input").val(citycon);
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-procity">城市：<span>'+citycon+'</span><em>&times;</em><input type="hidden" value='+citycon+'></div>');					
		}
	})
//	城市搜索 end
	//职位状态
	$(document).on("click","#pro_btn_statussearch",function(){	
		var statuscon= $(this).siblings(".popselectCon").find("select").val();
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-prostatus")) {
			$(".popchoosed-box").find(".popchoosed-prostatus").find("span").text(statuscon);	
			$(".popchoosed-box").find(".popchoosed-prostatus").find("input").val(statuscon);
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-prostatus">状态：<span>'+statuscon+'</span><em>&times;</em><input type="hidden" value='+statuscon+'></div>');					
		}
	})
//	职位紧急度
	$(document).on("click","#pro_btn_urgencysearch",function(){	
		var urgencycon= $(this).siblings(".popselectCon").find("select").val();
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-urgency")) {
			$(".popchoosed-box").find(".popchoosed-urgency").find("span").text(urgencycon);	
			$(".popchoosed-box").find(".popchoosed-urgency").find("input").val(urgencycon);
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-urgency">紧急度：<span>'+urgencycon+'</span><em>&times;</em><input type="hidden" value='+urgencycon+'></div>');					
		}
	})
	//	职能搜索
	$(document).on("click","#pro_btn_title,#rc_btn_title",function(){	
		$('.zhinengcon').find("span").each(function(index) {
			$(this).find("em").text("");
			if(index==0){
				code = $(this).attr("code");
          		con = $(this).text().replace(/(^\s*)|(\s*$)/g,"");
			} else {
				code = code+','+$(this).attr("code");
          		con = con+','+$(this).text().replace(/(^\s*)|(\s*$)/g,"");
          		return code;
          		return con;
			}              	
      	});
//    	var scode = code.split(',');
//    	var scon = con.split(',');      	
//    	var len = scode.length;
//    	$(".zhinengbox").find(".zhinengcon").html("");
//		for(var i=0; i<len; i++){	
//		 	$(".zhinengbox").find(".zhinengcon").append("<span code="+scode[i]+">"+scon[i]+"<em>&times;</em></span>");			 		
//		}
		
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-title")) {
			$(".popchoosed-box").find(".popchoosed-title").find("span").text(con);	
			$(".popchoosed-box").find(".popchoosed-title").find("input").val(con);	
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-title">职能：<span code='+code+'>'+con+'</span><em>&times;</em><input type="hidden" value='+con+'></div>');					
		}
	})

//	职位开放时间
	$(document).on("click","#pro_btn_timesearch",function(){
		var starttime= $(this).siblings("div").find(".starttime").val();
		var endtime= $(this).siblings("div").find(".endtime").val();				
		if(moment(starttime)>moment(endtime)){
			alert("开始时间不能大于结束时间");
			return;
		}
		$(this).parents(".popselect-con").hide();
		if($(".popchoosed-list").hasClass("popchoosed-opentime")) {
			$(".popchoosed-box").find(".popchoosed-opentime").find("span.starttime").text(starttime);	
			$(".popchoosed-box").find(".popchoosed-opentime").find("input.input_open_start").val(starttime);				
			$(".popchoosed-box").find(".popchoosed-opentime").find("span.endtime").text(endtime);	
			$(".popchoosed-box").find(".popchoosed-opentime").find("input.input_open_end").val(endtime);	
			
			
		} else {
			$(".popchoosed-box").append('<div class="popchoosed-list popchoosed-opentime">开放时间：<span class="starttime">'+starttime+'</span><span>-</span><span class="endtime">'+endtime+'</span><em>&times;</em><input type="hidden" class="input_open_start" value='+starttime+'><input type="hidden" class="input_open_end" value='+endtime+'></div>');				
		}						
	})	
//		alert(guwen_id);	
//	项目关键词搜索 start
	$(document).on("click","#pro_btn_search,#pro_btn_citysearch,#pro_btn_title,#pro_btn_statussearch,#pro_btn_urgencysearch,#pro_btn_timesearch,.pro-popchoosed-box em",function(){
		var keywd = $("#searchtag").val();//查询公司名
		var city = $(".popchoosed-procity").find("input").val();//查询城市
		var status = $(".popchoosed-prostatus").find("input").val();//查询客户状态
		var func = $(".popchoosed-title").find("input").val();//查询职能
		var level = $(".popchoosed-urgency").find("input").val();//查询紧急度
		var open_start = $(".popchoosed-opentime").find("input.input_open_start").val();
		var open_end = $(".popchoosed-opentime").find("input.input_open_end").val();
		if(keywd==''||keywd==undefined){
			keywd='';
		}
		if(city==''||city==undefined){
			city='';
		}
		if(status==''||status==undefined){
			status='';
		}
		if(func==''||func==undefined){
			func='';
		}
		if(level==''||level==undefined){
			level='';
		}
		if(open_start==''||open_start==undefined){
			open_start='';
		}
		if(open_end==''||open_end==undefined){
			open_end='';
		}
		OrionJump('.projectcon','/project?keywd='+keywd+'&guwen_id='+guwen_id+'&city='+city+"&status="+status+"&func="+func+"&level="+level+"&open_start="+open_start+"&open_end="+open_end,false);
	})
//	项目关键词搜索 end
})

function searchpro()
    {
     	if (event.keyCode == "13") {
     		$("#pro_btn_search").click();
     	}
    }
