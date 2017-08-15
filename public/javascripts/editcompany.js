$(function(){
//		点击添加联系人按钮		
		$(document).on('click', '.contactCon button', function() {
		var i=0;	
		var str  = ' <div class="contact-box">'+
					' <div class="contact-center">'+		
	    			' 		<div class="form-group form-inline ">'+
					' 		    <label class="" for=""><span>*</span>联系人：</label>'+
					' 		    <input type="text" class="form-control np_form_check js-contactor" placeholder="请输入联系人" np_require="true" autocomplete="off" name="contactList.contact_name" value="">'+
					' 		    <span class="help-block"></span>'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span>*</span>性别：</label>'+
					' 		    <select class="form-control">'+
					' 			  	<option value="" disabled selected>请选择性别</option>'+
					' 			  	<option value="1">男</option>			'+			  		
					' 			  	<option value="0">女</option>		'+				  		
					' 			</select>'+
					' 			<input type="hidden" class="np_form_check" placeholder="请选择性别" np_require="true" name="contactList.contact_sex" value="" />'+
					' 			<span class="help-block"></span>'+
					' 	  	</div>			'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span>*</span>担任职务：</label>'+
					' 		    <input type="text" class="form-control np_form_check js-jobname"  placeholder="请输入担任职务" np_require="true" autocomplete="off" name="contactList.contact_position" value="">'+
					' 		    <span class="help-block"></span>'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span>*</span>手机号码：</label>'+
					' 		    <input type="text" class="form-control np_form_check"  placeholder="请输入手机号码" np_format="phone"  err_format="手机号码格式错误" np_require="true" autocomplete="off" name="contactList.contact_phone" value="">'+
					' 		    <span class="help-block"></span>'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span></span>座机号码：</label>'+
					' 		    <input type="text" class="form-control" placeholder="请输入座机号码" autocomplete="off" name="contactList.contact_tel" value="">'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span></span>电子邮件：</label>'+
					' 		    <input type="text" class="form-control" placeholder="请输入电子邮件" autocomplete="off" name="contactList.contact_email" value="">'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span></span>QQ：</label>'+
					' 		    <input type="text" class="form-control"  placeholder="请输入QQ" autocomplete="off" name="contactList.contact_qq" value="">'+
					' 	  	</div>'+
					' 	  	<div class="form-group form-inline">'+
					' 		    <label class="" for=""><span></span>微信：</label>'+
					' 		    <input type="text" class="form-control"  placeholder="请输入微信" autocomplete="off" name="contactList.contact_weixin" value="">'+
					' 	  	</div>'+
					' 		<span class="glyphicon glyphicon-remove contact-remove text-danger">删除</span>'+	
					'</div>'+
	    			'<div class="contactdefault-list" style="display:none;"><span></span><span>HRD</span><span class="glyphicon glyphicon-pencil contactdefault-editbtn"></span></div>'+
					'</div>';
					
		$(".editcontact").find(".contact-center").each(function(){
			if($(this).is(":hidden")){
				i=i+1;
				return i;
			}						
		})
		if(($(".contact-box").find(".contact-center").length-i)==0){
			$(".editcontact").prepend(str);	
		}else{						
			if(checkform("editcontact") == false)
	        {
	            return;
	        }else{
	        	$(".editcontact").find(".contact-center").each(function(){
	        		$(this).siblings(".contactdefault-list").find("span").eq(0).text($(this).find(".js-contactor").val());
	        		$(this).siblings(".contactdefault-list").find("span").eq(1).text($(this).find(".js-jobname").val());
	        	})
	        	
	        	$(".contact-box").find(".contact-center").hide();					        	
	        	$(".contact-box").find(".contactdefault-list").show();
	        	$(".editcontact").prepend(str);	
	        }						
		}
	})
//	编辑联系人
		$(document).on('click', '.contactdefault-editbtn', function() { 
			var i=0;
			$(".editcontact").find(".contact-center").each(function(){//编辑时判断是否有展开的编辑项
				if($(this).is(":hidden")){
					i=i+1;
					return i;						
				}
				
			})
//			如果表单都是隐藏,则不需要判断,直接展开
			if(($(".editcontact").find(".contact-center").length-i)==0){
				$(this).parents(".contactdefault-list").hide();
				$(this).parents(".contactdefault-list").siblings(".contact-center").show();
			}else{
				if(checkform("editcontact") == false){
		            return;
		        }else{
		        	$(this).parents(".contactdefault-list").hide();
					$(this).parents(".contactdefault-list").siblings(".contact-center").show();
		        }
			}			
		})
		
//	客户资料删除
	$(document).on('click', '.ziliao-con em', function() { 
		$(this).parent().remove();
		var ziliao_id = $(this).parent('div').attr('ziliao_id');
		var str = '<input type="hidden" name="delete_ziliao.ziliao_id" value="'+ziliao_id+'">';
		$("#delete_ziliao").append(str);
	})
//	客户新闻添加
	$(document).on("click",".news_editcon button.btn-link",function(){
		$(this).siblings(".news_edit").find("div").show();
	})
//	确定添加新闻 start
	$(document).on("click",".news_add",function(){	
		var now_title = $("#news_title").val();  //储存input
		var now_url = $("#news_url").val();		 //储存input
		var title = $("#temp_news_title").val();
		var new_url = $("#temp_news_url").val();
		if(new_url.indexOf('http://') < 0)
		{
			new_url = 'http://'+new_url;
		}
		
		var str="";
        if(title!='' && new_url!=''){
        	str = '<div class="news_list">'+
				  '	<span class="glyphicon glyphicon-link"></span>'+	
          		'	<a href="'+new_url+'" target="_blank" title="'+new_url+'">'+title+'</a>'+
          		'	<em class="glyphicon glyphicon-remove"></em>'+
          		'</div>';
        	$(this).parent().hide();
        	$(".news_con").append(str);
        	if(now_title=="") {
				$("#news_title").val(title);
	        	$("#news_url").val(new_url);
			} else {
				$("#news_title").val(now_title+","+title);
        		$("#news_url").val(now_url+","+new_url);
			}        	
			$("#temp_news_title").val('');
			$("#temp_news_url").val('');
        }		
	})
//	确定添加新闻 end

//	删除新闻 start
	$(document).on("click",".news_list em",function(){	
		$(this).parents(".news_list").remove();
		var newscon= '';
		var con_url= '';
		$('.news_con').find(".news_list").each(function(index) {
			if(index==0){
          		newscon = $(this).find("a").text().replace(/(^\s*)|(\s*$)/g,"");
          		con_url = $(this).find("a").attr("href").replace(/(^\s*)|(\s*$)/g,"");
			} else {
          		newscon = newscon+','+$(this).find("a").text().replace(/(^\s*)|(\s*$)/g,"");
				con_url = con_url+','+$(this).find("a").attr("href").replace(/(^\s*)|(\s*$)/g,"");          		
			}              	
      	});
      	$("#news_title").val(newscon);
      	$("#news_url").val(con_url);
	})
//	删除新闻 end
	
//	客户来源 start  担保人和介绍人是否显示
	$(document).on('change', '.selectcompany_source', function() { 
        var val = $(this).find("option:selected").attr("value"); 
        if(val=="人脉推荐") {
        	$(".danbaoren").css("display","inline-block");
        	$(".jieshaoren").css("display","inline-block");
        	$(".jieshaoren").find("input").addClass("np_form_check").removeClass("input_hideen");
        	$(".danbaoren").find("input").addClass("np_form_check").removeClass("input_hideen");     	
        }
        else {
        	$(".danbaoren").hide();
        	$(".jieshaoren").hide();
        	$(".danbaoren").find("input").removeClass("np_form_check").addClass("input_hideen");
        	$(".jieshaoren").find("input").removeClass("np_form_check").addClass("input_hideen");
        }
	}); 
//	客户来源 end


	
//	添加行业
	$(document).on("click",".industryopen",function(){			
		$(".popindustrycon").show();
		$(".popbg000").show();
		getAllindustry();
	})
//	选择行业
//	$(document).on("click",".popindustry-list li",function(){
//		$(this).find("input").click();
//	})
//确定添加行业
	$(document).on("click",".popindustry-ok",function(){
		var boxes = $(".popindustry-list").find("input");
//	    var val = []
		var str='';
		var content='';
		var codes='';
	    for(i=0;i<boxes.length;i++) {
	        if(boxes[i].checked == true){
//	            val.push(boxes[i].value);
				var con = boxes[i].value;				
				var code = boxes[i].id;	
				code = parseInt(code);
				if(con){
					str+="<div code='"+code+"'>"+con+"<span class='glyphicon glyphicon-remove'></span></div>"
					content+=con+',';
					codes+=code+',';
					$(".industrycon").empty().html(str);					
				}				
	        }
	    }
	    content=(content.slice(content.length-1)==',')?content.slice(0,-1):content;	//去掉最后一个分号
	    codes=(codes.slice(codes.length-1)==',')?codes.slice(0,-1):codes;	//去掉最后一个分号
	    $(".industrycon").parents(".form-group").removeClass("has-error");
		$(".industrycon").parents(".form-group").find(".help-block").text("");					
		$(".industrybox").siblings("input.company_techtag").val(content);
		$(".industrybox").siblings("input.lingyu_cd").val(codes);
		$(".popindustrycon").hide();
		$(".popbg000").hide();
	})
//取消添加行业	
	$(document).on("click",".popindustry-cancel",function() {
		$(".popindustrycon").hide();
		$(".popbg000").hide();
	})
//	关闭
	$(document).on("click",".popindustry-header a",function() {	
//		$(".popindustrycon").empty().hide();
		$(".popindustrycon").hide();
		$(".popbg000").fadeOut();
	})
	
//	删除行业 start
	$(document).on("click",".industrycon span",function() {
		$(this).parent("div").remove();		
		var code= '';
		var con= '';
		if($(".industrycon").find("div").length==0){
			$(".industrycon").text("请选择行业");
			return
		}
		$('.industrycon').find("div").each(function(index) {
			if(index==0){
				code = $(this).attr("code");
          		con = $(this).text().replace(/(^\s*)|(\s*$)/g,"");          		
			}else {
				code = code+','+$(this).attr("code");
          		con = con+','+$(this).text().replace(/(^\s*)|(\s*$)/g,"");
			}              	
      	});
      	$("#company_techtagplease").siblings("input.company_techtag").val(con);
      	$("#company_techtagplease").siblings("input.lingyu_cd").val(code);
	})
//	删除行业 end
	
	
//	客户联系人鼠标滑过编辑和删除 start
	$(document).on('mouseover', '.contact-center', function() {  
		$(this).find(".contact-remove").show();
	})
	$(document).on('mouseout', '.contact-center', function() {  
		$(this).find(".contact-remove").hide();
	})
	$(document).on('click', '.contact-remove', function() { 
		$(this).parents(".contact-box").remove();
	})	
	$(document).on('mouseover', '.contactdefault-list', function() {  
		$(this).find(".contactdefault-editbtn").show();
	})
	$(document).on('mouseout', '.contactdefault-list', function() {  
		$(this).find(".contactdefault-editbtn").hide();
	})
//	客户联系人鼠标滑过编辑和删除 end

//保存客户
	$(document).on('click', '.save-companybtn', function() {
		if($(this).hasClass('disabled'))
		{
			return;
		}
		//移动目标
        var target_error = {};
        if(jumpToform("editcompany",target_error) == false){
            goDiv(target_error.jumpid);
        }
		var param = $("#editcompany").serializeObject ();	
		if(checkform("editcompany") == false)  //||checkform("editcontact") == false
        {
            return false
        }
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/customer/save_customer";
		ajax.callback=function(data){
			OrionJump('.center-container','/companydetail?customer_id='+data.customer_id,false);		
			$(".modal-backdrop").remove();
		};
		ajax.post();
		$(this).addClass('disabled');
	});	
})

//function fun(){
//  var boxes = $(".popindustry-list").find("input");
//  var val = []
//  for(i=0;i<boxes.length;i++) {
//      if(boxes[i].checked == true){
//          val.push(boxes[i].value);
//      }
//  }
//  alert(val);
//}



function getAllindustry()
{
	var param = {};
	jQuery.ajax({	   
        type: 'post',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        url: logic_api_host + "/api/common/all_industry",
        data: JSON.stringify(param),     
        success: function(result){
			
            $(".popindustry-main").html('').html(template('popindustry', result));
        }
    })
}

//上传客户资料
function upload(){
	var param = {};
	var num = $(".docname").size();
    $.ajaxFileUpload({
        type: 'post',
        url: logic_api_host+'/api/file/uploadtemp',
        secureuri:false,
        fileElementId: 'temp_file',
        dataType: 'json',  
        data: JSON.stringify(param),   
        success: function (data,status){
        	if(!data.maxSizeErr){
        		// if(num<1){
        		// 	$(".ziliao_box").find(".palceholder-span").remove();
        		// }
        		var hiddeninput = "<div class='docname'><i class='glyphicon glyphicon-folder-open'><span>"+data.original_name+"</span></i><em class='glyphicon glyphicon-remove'></em>";
        		hiddeninput +='<input type="hidden" name="ziliaoList.original_name" value="'+data.original_name+'">';
        		hiddeninput += '<input type="hidden" name="ziliaoList.tempfile_name" value="'+data.temp_file_name+'">';
        		hiddeninput += "</div>";
        		$(".ziliao-con").append(hiddeninput);	
//                 $(".ziliao_box").find(".docname").show();
//                 $(".docname").find("span").text(data.doc_name);
        	}else if(data.maxSizeErr == "1"){
        		alert('文件大小不得超过100M');
        		return;
        	}else if(data.type_error == "1"){
        		alert("文件格式错误");
        		return;
        	}
        },error: function (data,status,e){  
        	alert('上传失败,请重试。');
        }
    }); 
}  