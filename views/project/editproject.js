var oldContent = "";//文本变化前的内容，使用它和新内容对比，发生了变化才发送ajax请求
var currentSelIndex = -1;  
var oldSelIndex = -1;
$(function(){
//	添加工作地点
	$(document).on('click', '.add-workcity', function() {
		var str='<div class="form-inline form-group100 form-workcity">'+
		  		'	<div class="form-group form-part">'+
		  		'		<label class="" for=""><span>*</span>工作地点：</label>'+
				'    	<input type="text" name="locationList.job_area" class="form-control np_form_check" placeholder="请输入工作地点" np_require="true" autocomplete="off">'+
				'    	<span class="help-block"></span>'+
		  		'	</div>'+
				'    <div class="form-group form-part">'+
		  		'		<label class="" for="">详细地址：</label>'+
				'    	<input type="text" name="locationList.job_location" class="form-control"  placeholder="请输入详细地址">'+
		  		'	</div>'+
				'    <div class="form-group form-part">'+
		  		'		<label class="" for=""><span>*</span>需求人数：</label>'+
				'    	<input type="text" name="locationList.job_renshu" class="form-control np_form_check" placeholder="请输入需求人数" np_require="true" autocomplete="off">'+
				'    	<span class="help-block"></span>'+
		  		'	</div>'+
		  		'	<a href="javascript:void(0);" class="glyphicon glyphicon-remove remove-workcity"></a>'+
			  	'</div>';
		$(".project-workcity").append(str);
	})
//	鼠标滑过
	$(document).on('mouseover', '.form-workcity', function() {
		$(this).addClass("hover-bg").find(".remove-workcity").show();
	})
	$(document).on('mouseout', '.form-workcity', function() {
		$(this).removeClass("hover-bg").find(".remove-workcity").hide();
	})
//	删除工作地点
	$(document).on('click', '.remove-workcity', function() {
		var len = $(".form-workcity").length;
		if(len==1){
			alert("最少一个工作地点");
			return
		}
		$(this).parents(".form-workcity").remove();
	})
	
//	职能part start
//     	职能接口 start
		$(document).on("click",".zhinengopen,.zhineng-tabs li.allzhineng",function() {//点击弹出所有职能和弹出后点击全部职能
			var $this = $(this);
			$(".zhineng-choosed").find('span').remove();
			//遍历选中值，让弹出框默认显示已选职能
			$('.zhinengcon').find("span").each(function(index) {
				code = $(this).attr("code");
          		con = $(this).text().replace(/(^\s*)|(\s*$)/g,"");
				$(".zhineng-choosed").append('<span code="'+code+'">'+con+'</span>');
          	});

			var param = {};
	        jQuery.ajax({	   
	            type: 'post',   
	            contentType : 'application/json; charset=utf-8',   
	            dataType: 'json',   
	            url: logic_api_host + "/api/common/getFunctionStart",
	            data: JSON.stringify(param),   
	            success: function(data){
	            	$(".zhineng-center").html('').html(template('tpl_zhinengmould', data));
	            	$this.addClass("active");
	            	$this.nextAll().remove();
		        }        
			})			 
		})		
//     	职能接口 end
$('.zhineng').on("hidden.bs.modal",function(event){
	$(".zhineng-tabs li").addClass("active").eq(0).nextAll().remove();
});
//职能搜索点击事件 start
		$(document).on("click",".zhineng_ul li",function() {
			if($(this).hasClass("active")){
				return false;
			}else{
				var code= $(this).attr("code");
				var con = $(this).text();
				$(".zhinengbox").find(".zhinengcon").append("<span code="+code+">"+con+"<em class='glyphicon glyphicon-remove'></em></span>");			 		
				var int_code =  $(".zhinengbox").siblings("input.job_type_code").val();
				var int_con =  $(".zhinengbox").siblings("input.np_form_check").val();
				var codechange= int_code+','+code;
				var conchange= int_con+','+con;
				$(".zhinengbox").siblings("input.job_type_code").val(codechange);
				$(".zhinengbox").siblings("input.np_form_check").val(conchange);
				$(".zhinengchoose").slideUp();
				$(".zhinengsearch").val('');
			}			
		})
//		职能点击下拉 start
		
//		职能点击下拉 end
		$(document).on('keyup', '.zhinengsearch', function(event) {
	    var param = new Object();
	    var text = $(this);
	    $(".zhineng_ul").hide();
	    $(".zhinengchoose").slideUp();
	    param.query_name = $(this).val().replace(/(^\s*)|(\s*$)/g,"");
	    if(param.query_name=='')
	    {
	    	return;
	    }
		var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/common/search_function";
		ajax.callback=function(data){
			var str = '';
			$.each(data.catalog_list,function(index,catalog){
				str += '<li class="active">'+catalog.catalog_name+'</li>';
				$.each(catalog.funcList,function(indexi,func){
					str += '<li code="'+func.func_code+'">'+func.func_name+'</li>';
				});
			});
			$(".zhineng_ul").html(str);
			if($(".zhineng_ul").text() != '')
			{
				$(".zhinengchoose").show();
				$(".zhineng_ul").show();
			}
			
		};
		ajax.post();
	});
		
		
//		职能列表中点击选中或未选择
		$(document).on("click",".zhineng-list a,.zhineng-tabs li.classzhineng,.zhinenglist-left a",function(e) {
			var $this = $(this);
			var target = $(e.target);		
			var code = $this.attr("code");
			var level = $this.attr("level");
			var con = $this.text();
			if(level=='4'){	//如果是第四级，则可以选中(后期检查一下是否在tab项里面)
				if(!target.hasClass('active'))
				{
					$(".zhineng-choosed").append("<span code="+code+">"+con+"</span>");
					$this.addClass("active");
				}else{
					$this.removeClass("active");
					var code= $this.attr("code");
					$(".zhineng-choosed").find("span").each(function(){
						if($(this).attr("code")==code){
							$(this).remove();
						}
					})
				}
				
	            return;
	        }
			var param = {};	        
	         param.catalog_code = code;
	        jQuery.ajax({	   
	            type: 'post',   
	            contentType : 'application/json; charset=utf-8',   
	            dataType: 'json',   
	            url: logic_api_host + "/api/common/all_function",
	            data: JSON.stringify(param),   
	            success: function(data){
	            	if(target.closest(".zhinenglist-left a").length != 0){
	            		$this.parents("li").addClass("active");
	            		$this.parents("li").siblings("li").removeClass("active");
	            		$(".zhinenglist-right").html('').html(template('tpl_zhinenglist', data));
	            	}else {	    
	            		if(level=='4'){	//如果是第四级，则可以选中(后期检查一下是否在tab项里面)
	            			$(".zhineng-choosed").append("<span code="+code+">"+con+"</span>")
	            		}else if(level=='2'){
	            			if(data.childList[0].child_level=='3'){
	            				$(".zhineng-center").html('').html(template('tpl_zhinengpart', data));
	            				$(".zhinenglist-left").find("li").eq(0).addClass("active").find("a").click();
	            				
	            			}else if(data.childList[0].child_level=='4'){
	            				$(".zhineng-center").html('').html(template('tpl_zhinenglist', data));
	            			}
	            			$(".zhineng-tabs").find("li").removeClass("active");
	            			$(".zhineng-tabs").find("ul").append('<li class="active classzhineng" code="'+code+'"><a href="javascript:void(0);" level="'+data.level+'" no-nave="true"><span>'+data.catalog_name+'</span><em></em></a></li>');

	            		} else {
	            			$(".zhineng-center").html('').html(template('tpl_zhinenglist', data));
		            		$(".zhineng-tabs").find("ul").find("li").removeClass("active");	            		
			            	if (target.closest(".zhineng-tabs li.classzhineng").length == 0) { 
		            			$(".zhineng-tabs").find("ul").append('<li class="active classzhineng" code="'+code+'"><a href="javascript:void(0);" level="'+data.level+'" no-nave="true"><span>'+data.catalog_name+'</span><em></em></a></li>');
							} else {
			            		$this.addClass("active");
			            		$this.nextAll().remove();
			            	}
		            	}
			        }  
			        selectedFuntion();
			        }
				})	
			})
//保存职能 start
		$(document).on("click",".btn-savezhineng",function() {
			var code= '';
			var con= '';
			$('.zhineng-choosed').find("span").each(function(index) {
				if(index==0){
					code = $(this).attr("code");
              		con = $(this).text().replace(/(^\s*)|(\s*$)/g,"");
				} else {
					code = code+','+$(this).attr("code");
              		con = con+','+$(this).text().replace(/(^\s*)|(\s*$)/g,"");
				}              	
          	});
          	var scode = code.split(',');
          	var scon = con.split(',');
          	$(".zhineng").modal("hide");
          	
          	var len = scode.length;
          	var len2 = scon.length;
          	$(".zhinengbox").find(".zhinengcon").html("");
			for(var i=0; i<len; i++){	
				if(scode[i] != '')
				{
					$(".zhinengbox").find(".zhinengcon").append("<span code="+scode[i]+">"+scon[i]+"<em class='glyphicon glyphicon-remove'></em></span>");	
				}	 		
			}
			$(".zhinengbox").siblings("input.job_type_code").val(code);
			$(".zhinengbox").siblings("input.np_form_check").val(con);
		})
//保存职能 end
//删除职能 start
$(document).on("click",".zhinengcon em",function() {
	var code= '';
	var con= '';
	$(this).parents("span").remove();
	$('.zhinengcon').find("span").each(function(index) {
		if(index==0){
			code = $(this).attr("code");
      		con = $(this).text().replace(/(^\s*)|(\s*$)/g,"");
		} else {
			code = code+','+$(this).attr("code");
      		con = con+','+$(this).text().replace(/(^\s*)|(\s*$)/g,"");
		} 
  });
  	$(".zhinengbox").siblings("input.job_type_code").val(code);
  	$(".zhinengbox").siblings("input.np_form_check").val(con);
})
//	删除职能 end
//		已经选择的职能项 start
		$(document).on("click",".zhineng-choosed span",function() {
			$(this).remove();			
		})
//		已经选择的职能项 end
//	职能part end
//		保存项目 start
		$(document).on('click', '#save-project', function() { 
			//移动目标
	        var target_error = {};
	        if(jumpToform("editproject",target_error) == false){
	            goDiv(target_error.jumpid);
	        }
			var x=$(".editcompany").serializeObject ();	
			if(checkform("checkbox") == false)  
	        {
	            return false
	        }

	        var ajax = new NpAjax();
	        ajax.param = x;
			ajax.url = "/api/jobs/save";
			ajax.callback=function(data){
				OrionJump('.center-container','/projectdetail?job_id='+data.jobid,true);
			};
			ajax.post();
			
		})
//		保存项目 end
	//客户名称模糊查询
	//模糊查询鼠标滑过 start
	$(document).on('mousemove', '.auto-search-ul li', function(event) { 
	    $(this).css("background","#f5f5f5");
	});
	$(document).on('mouseout', '.auto-search-ul li', function(event) { 
	    currentSelIndex = -1;
	    oldSelIndex = -1;
	    $(this).css("background","#fff");
	});
	//模糊查询鼠标滑过 end
	//公司 鼠标点击事件
	$(document).on('click', '.auto-search-ul li', function(event) { 
	    var e=window.event || event;
	    if(e.stopPropagation){
	        e.stopPropagation();
	    }else{
	        e.cancelBubble = true;
	    } 
	    var vals = $(this).text().replace(/(^\s*)|(\s*$)/g,"");//公司全称
	    var gzjl_id= $(this).attr("gzjl_id");//公司id
	    company_id = gzjl_id;
	    $("#customer-search").val(vals);
	    $("#companyid").val(gzjl_id);
	    $(this).parents('.auto-search').hide();	
	    getCompanyContact(company_id,"");
	});
	// 公司名称匹配
	$(document).on('click', '#customer-search', function() { 
		var $this = $(this);
		var param = new Object();
	    param.company_name = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	    param.company_openid = company_openid;
	    jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host+'/api/searchCompany', 
	        data: JSON.stringify(param),   
	        success: function(data){
//	           if(data.ret == "0"){
	                if(data.companyList.length > 0){
	                	setTimeout(function(){
	                         $this.siblings(".auto-search").slideDown();
		                },500);
		                $this.siblings(".auto-search").find(".auto-search-ul").html("");
	                    $this.siblings(".auto-search").find(".auto-search-ul").show();
	                     var length = data.companyList.length;
	                      for(var i=0;i<length;i++){
//	              			  data.companyList[i].company_photo;
	              			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" gzjl_id='+data.companyList[i].id+'>'+data.companyList[i].company_name+'</li>');
	                      }
	                  }else{
	                      $this.siblings(".auto-search").hide();
//	                    $this.parents(".gzjl_edit_list").css({"z-index":"0"});
	                  }
//	              }
	          }
	     });
	});
	$(document).on('keyup', '#customer-search', function(event) { 
		lastTime = event.timeStamp;
	//	headerloadflg="0";
		var $this = $(this);
		if ((event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {  
			selectItem_gsname(event);
			if(event.keyCode == 13){
	         	$this.siblings(".auto-search").hide();
	         	$this.siblings(".auto-search").find(".auto-search-ul").html("");
	         	 $("#customer-search").val(company_name);
	         	company_id =$(this).attr("gzjl_id");
	         	getCompanyContact(company_id,"");   //联系人
			}
			return;
		}
		var content = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	  	if(content == "" || (oldContent == "" && content == oldContent)){
	        oldContent = "";
	        $this.siblings(".auto-search").hide();
	//		$this.parents(".gzjl_edit_list").css({"z-index":"0"});
	        return;//没有输入内容或者文本内容没有发生变化时就返回
	    }
	    oldContent = content;
	    var param = new Object();
	    param.company_name = $this.val().replace(/(^\s*)|(\s*$)/g,"");
	    param.company_openid = company_openid;
	    jQuery.ajax({   
	        type: 'post',   
	        contentType : 'application/json; charset=utf-8',   
	        dataType: 'json',   
	        url: logic_api_host+'/api/searchCompany', 
	        data: JSON.stringify(param),   
	        success: function(data){
//	           if(data.ret == "0"){
	                if(data.companyList.length > 0){
	                	setTimeout(function(){
		                	if(lastTime-event.timeStamp == 0){
		                         $this.siblings(".auto-search").slideDown();
	//	                         $this.parents(".gzjl_edit_list").css({"z-index":"10"});
	//	        				 $this.parents(".gzjl_edit_list").siblings(".gzjl_edit_list").css({"z-index":"0"});
	//	        				$(".myCardcon_time").find(".seles").css({"z-index":"0"});
		        				}
		                },500);
		                $this.siblings(".auto-search").find(".auto-search-ul").html("");
	                    $this.siblings(".auto-search").find(".auto-search-ul").show();
	                     var length = data.companyList.length;
	                     if(length > 6){
	                         length = 6;
	                      }
	                      for(var i=0;i<length;i++){
//	              			  data.companyList[i].company_photo;
	              			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" gzjl_id='+data.companyList[i].id+'>'+data.companyList[i].company_name+'</li>');
	                      }
	                  }else{
	                      $this.siblings(".auto-search").hide();
	//                    $this.parents(".gzjl_edit_list").css({"z-index":"0"});
	                  }
//	              }
	          }
	     });
	});

})

function selectItem_gsname(event) {  
	var liLength = document.getElementById("ulItems").getElementsByTagName("li").length;
	//获取列表数量  
	if ((event.keyCode == 38 || event.keyCode == 40)) {  
		if (liLength > 0) {  
			oldSelIndex = currentSelIndex;  
			//上移  
			if (event.keyCode == 38) {  
				if (currentSelIndex == -1) {  
					currentSelIndex = liLength - 1;  
				}else {  
					currentSelIndex --;  
					if (currentSelIndex < 0) {  
						currentSelIndex = liLength - 1;  
					}  
				}  
				if (currentSelIndex != -1) {  
					document.getElementById("lk_" + currentSelIndex).style.backgroundColor = "#f5f5f5";  
				}  
				if (oldSelIndex != -1) {  
					document.getElementById("lk_" + oldSelIndex).style.backgroundColor = "#fff";  
				}  
			}  
			//下移  
			if (event.keyCode == 40) {  
				if (currentSelIndex == liLength - 1) {  
					currentSelIndex = 0;  
				}else {  
					currentSelIndex ++;  
					if (currentSelIndex > liLength - 1) {  
						currentSelIndex = 0;  
					}  
				}  
				if (currentSelIndex != -1) {  
					document.getElementById("lk_" + currentSelIndex).style.backgroundColor = "#f5f5f5";  
				}  
				if (oldSelIndex != -1) {  
					document.getElementById("lk_" + oldSelIndex).style.backgroundColor = "#fff";  
				}  
			} 
		} 
	} else if (event.keyCode == 13) { 
		if ((document.getElementById("ulItems").style.display == "" || document.getElementById("ulItems").style.display != "none" ) && currentSelIndex != -1) {  
			company_name =$("#lk_" + currentSelIndex).text().replace(/(^\s*)|(\s*$)/g,"");
            company_id = $("#lk_" + currentSelIndex).attr("gzjl_id");
            company_photo = $("#lk_" + currentSelIndex).attr("company_photo");
            currentSelIndex = -1;  
            oldSelIndex = -1;  
		}  
	} 
}
//联系人
function getCompanyContact(company_id,contact_id)
{
	var param = {};
	param.customer_id=company_id;
	jQuery.ajax({   
        type: 'post',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        url: logic_api_host+'/api/customer/contacts', 
        data: JSON.stringify(param),   
        success: function(data){
        	$(".select-fuzeren").html("");
        	if(contact_id == "")
        	{
        		$(".select-fuzeren").append('<option value="" disabled selected>请选择联系人</option>');
        	}
        	$.each(data.contactList,function(i,item){
        		var str = '<option value="'+item.id+'"';
        		if(contact_id == item.id)
    			{
    				str += ' selected ';
    			}
        		str  += '>'+item.contact_name+'</option>';
        		$(".select-fuzeren").append(str);
        	})							  	
        }
	})
}

function selectedFuntion()
{
	var selectedFunction = $("#func_code").val().split(',');
	$('.zhineng-list').find("a").each(function(index) {
		var code = $(this).attr('code');
		var aobj = $(this);
		$.each(selectedFunction,function(indexi,func_code){
			if(func_code==code)
			{
				aobj.addClass('active');
				return;
			}
		});
	});
}



