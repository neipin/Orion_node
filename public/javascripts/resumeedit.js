$(function(){
//	工作经历添加
	$(document).on('click', '.list_add_gzjl', function() { 
		$('.jobexperience').append(template('jobexperience_null', {}));
	})
//	项目经验添加
	$(document).on('click', '.list_add_xmjl', function() { 
		$('.projectexperience').append(template('projectexperience_null', {}));
	})
//	教育经历添加
	$(document).on('click', '.list_add_jyjl', function() { 
		$('.eduexperience').append(template('eduexperience_null', {}));
	})
	$(document).on('click',".list_delate",function(){
		$(this).parents(".servicelistcon").remove();
	})
	
//	点击至今 start
	$(document).on('click', '.time_now input', function() { 
		if($(this).is(':checked')) {
			$(this).parents(".time_now").siblings(".salary_text").text("").hide();
			$(this).parents(".time_now").prev(".salary_div").hide();
		}else{
			$(this).parents(".time_now").siblings(".salary_text").show();
			$(this).parents(".time_now").prev(".salary_div").show();
		}
	})
//	点击至今 end

//	保存简历start
	$(document).on('click', '.save_box_btn', function() { 
		if($(this).hasClass('disabled'))
		{
			return;
		}
		//移动目标
        var target_error = {};
        if(jumpToform("editgoodman",target_error) == false){
            goDiv(target_error.jumpid);
        }
        if(checkform("editgoodman") == false){	        	
			return
		}
		var param=$("form").serializeObject ();
		
		param.resume_file_name = jianli_name;
		param.resume_upload_name = original_Name;
		var ajax = new NpAjax();
	    ajax.param = param;
		ajax.url = "/api/save_resume";
		ajax.callback=function(result){
			openid=result.openid;	
			if(result.msg == "手机号重复"){
				alert("该简历已存在，请搜索手机号编辑该简历");
				return
			}
			OrionJump('.center-container','/rencaidetail?openid='+openid,true);//??????未做简历详情
		};
		ajax.post();
		$(this).addClass('disabled');
	})
//	保存简历 end
})
//上传简历
function uploadjianlinew(){
	$(".pop_bg").show();
	$(".div_loading").show();
    $.ajaxFileUpload({
    	type: 'post',
    	url: logic_api_host+'/ajax/uploadjianlinew.do',
    	secureuri:false,
    	fileElementId: "jianli",
    	dataType: 'json',  
    	data: {}, 
    	success: function (data,status){
    		if(data.maxSizeErr == "1"){
    			alert('文件大小不得超过15M!');
    			$('.whitebg').hide();
    			return;
    		}else if(data.type_error == "1"){
    			alert("文件格式错误！");
    			$('.whitebg').hide();
    			$(".pop_bg").hide();
    			return;
  		}
    		
	  		jianli_name = data.jianli_name;//简历物理名
	  		original_Name = data.originalName;//原文件名
	  		$('.originalName').text(data.originalName);
			anys(jianli_name); 
			loadcity($("#ssss"));	//所在城市初始化
			loadcity($("#qiwangcity"));	//期望城市初始化
			$(".uploadname").show();			
			return;
			
    	},
    	error: function (data,status,e){  
    		$(".pop_bg").hide();
    		$(".div_loading").hide();
    		alert('文件上传失败，请重新上传！');
    	}
    }); 
}
//解析简历
function anys (resume_file_name){
	var param = new Object();
	param.resume_file_name = resume_file_name;
	param.company_openid = company_openid;
	var ajax = new NpAjax();
    ajax.param = param;
	ajax.url = "/api/resume_jiexi";
	ajax.callback=function(result){
		var param = {};
		param.data = result;
		//template执行
		$('.baseInfo').html('').html(template('baseInfo', param));
		$('.jobexperience').html('').html(template('jobexperience', param));
		$('.eduexperience').html('').html(template('eduexperience', param));
		$('.projectexperience').html('').html(template('projectexperience', param));
		$(".pop_bg").hide();
		$(".div_loading").hide();
		loadcity($("#ssss"));
        loadcity($("#dddd"));
		if(result.resume_duplicate==1){
			alert("该简历已存在，请搜索手机号编辑该简历");
			return
		}
	};
	ajax.post();
}
//整个表单check jump end
//上传简历
function uploadjianli(){
	var id = "f_jianli";
    $.ajaxFileUpload({
    	type: 'post',
    	url:  BaseJSURL+'/ajax/newuploadjianli.do',
    	secureuri:false,
    	fileElementId: id,
    	dataType: 'json',  
    	data: {}, 
    	success: function (data,status){
    		if(data.maxSizeErr == "1"){
    			alert('文件大小不得超过15M!');
    			$('.whitebg').hide();
    			return;
    		}else if(data.type_error == "1"){
    			alert("文件格式错误！");
    			$('.whitebg').hide();
    			return;
    		}
    		jianli_name = data.jianli_name;//简历物理名
    		original_Name = data.originalName;//原文件名
    		$(".uploadname").show();
    		$('.originalName').text(data.originalName);
    		uploadsuccess();
    		return;
    	},
    	error: function (data,status,e){  
    		alert('文件上传失败，请重新上传！');
    	}
    }); 
}
function uploadsuccess(){
    var param = new Object();
    param.param1 = jianli_name;//临时名字
    param.param2 = original_Name;//上传时的名字
    param.param3 = openid;
    if(param.param1 == "" || param.param2 == ""){
	     $('.originalName').text("简历名字");
	     return;
    }
    //上传成功
    jQuery.ajax({   
    	type: 'post',   
    	contentType : 'application/json; charset=utf-8',   
    	dataType: 'json',   
    	url: BaseJSURL+'/ro/sjianlinew', 
    	data: JSON.stringify(param),   
    	success: function(date){
    		if(date.ret == 0){
    			jianli_name = "";
    			original_Name = "";
    		}
    	}
    });
}
/**
 * 手机验证
 */
function telephone_cenow(_str){
	if(_str == "" || _str.length == 0)
	{
		msa="不能为空";
		return false;
	}else if(/^0{0,1}1(3|5|8|7|4|9)[0-9]{9}$/.test(_str) == false)
	{
		msa="格式不对";
		return false;
	}else if(_str.length!=11)
	{
		msa="长度为11位";
		return false;
	}
	
    return true;
}