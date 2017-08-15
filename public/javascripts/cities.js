function loadcity(block)
{
	var param = {};
	var str ='<ul class="choose_province">';
	jQuery.ajax({   
        type: 'post',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        url: logic_api_host+'/api/common/allProvince',        
        data: JSON.stringify(param),   
        success: function(data){
        	$.each(data.provinceList,function(index,p){
        		if(index ==0){
        			str += '<li v='+p.province_id+' class="active">' + p.province_name + '</li>';
        		}
        		else{
        			str += '<li v='+p.province_id+'>' + p.province_name + '</li>';
        		}
        	
        	});
        	var strs ='<ul class="choose_city" style="display: block;" >';
        	$.each(data.hotcityList,function(index,c){
        		strs += '<li v='+c.city_id+'>' + c.city_name + '</li>';
            	});
        	str += '</ul>';
        	block.html(str);
        	
        	
//        	jQuery.ajax({   
//                type: 'get',   
//                contentType : 'application/json; charset=utf-8',   
//                dataType: 'json',   
//                url: '', 
//                data: '',   
//                success: function(data){
//                	str += '<li v='+data.cd+'>' + data.city + '</li>';
//                }
//        	});
        	strs += '</ul>';
        	block.append(strs);
        }
});
}

$(function() {
	$(document).on("click",'#dis_location',function(event) {
		$(this).siblings(".doble_choose").show();
	})
	$(document).on("click",'.i_city em',function(event) {		
		$(this).parents(".i_city").remove();
		var len = $(this).parents("#dis_location").find(".i_city").size();
		if(len==0){
			$('#dis_location').append("<span class='seles_choose'>请选择城市</span>");
		}
	})
//	点击空白  start
	$(document).on("click",function(e) {
		var target = $(e.target);
		if (target.closest(".seles_location").length == 0 && target.closest(".doble_choose").length == 0 && target.closest("#dis_location").length == 0) {
			$('.doble_choose').hide();  
		}		
		if (target.closest(".popselect-list").length == 0 && target.closest(".i_city").length == 0 && target.closest(".popindustrycon").length == 0&& target.closest(".industrycon span").length == 0 && target.closest(".popindustry-footer a").length == 0 && target.closest(".zhineng").length == 0&& target.closest(".zhinengcon em").length == 0) {
			$('.popselect-con').hide();                         
		}
//		职能搜索框
		if (target.closest(".zhinengsearch").length == 0 && target.closest(".zhinengchoose").length == 0) {
			$('.zhinengchoose').slideUp();
		}
	})
//	点击空白  end
// 省份点击 start
	$(document).on('click', '.choose_province li', function() {
		$(this).addClass("active");
		$(this).siblings("li").removeClass("active");	
		var pdiv = $(this).parents(".doble_choose").find(".choose_city");
		var str = '';
		var param = {};
		param.province_id = $(this).attr('v');
		jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host + '/api/common/getCity', 
	        data: JSON.stringify(param), 
	        success: function(data){	        	
	        	$.each(data.cityList,function(index,c){
	        		str += '<li v='+c.city_id+'>' + c.city_name + '</li>';
	        	});	        	
	        	pdiv.html(str);
	        }
		});		
	});
// 省份点击 end
	$(document).on('click', '.choose_city li', function() {
		var $this = $(this).text();
		var v =$(this).attr("v");
		if($(this).parents(".doble_choose").hasClass("choose_city_one")){
			$(this).parents(".doble_choose").siblings("#dis_location").html("").append("<div class='i_city' style='color:#555'><span v="+v+">"+$this+"</span></div>");
			$(this).parents(".doble_choose").hide();
		}else{
			var len = $("#dis_location").find(".i_city").length;
			var has_v="";
			$("#dis_location").find("span").each(function(){
				has_v+=$(this).attr("v")+',';	
			})
			if(len==0){
				$("#dis_location").html("").append("<div class='i_city'><span v="+v+">"+$this+"</span><em>&times;</em></div>");
			}else {
				if(has_v.indexOf(v)>-1) {
					return false
				}
				$("#dis_location").append("<div class='i_city'><span v="+v+">"+$this+"</span><em>&times;</em></div>")
				
			}
		}
		
		$(this).parents(".form-group").removeClass("has-error");
		$(this).parents(".form-control").siblings(".help-block").text("");
		$(this).parents(".seles_location").siblings("input").val($this);		
	});
})

