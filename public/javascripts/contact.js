var change_url = node_url+'/companydetail';
	$(function(){
		$('.form_datetime').datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2, //这里就设置了默认视图为年视图
            minView: 4, //设置最小视图为年视图
            forceParse: 0,
       	});
//	新增合同 start
		$(document).on('click', '#btn_newcontract', function() {
			$("#modal-contact").html('').html(template('tpl_contractmould'));
			time_ymd();
		})
//	新增合同 end	       	
//	编辑合同 start
		$(document).on('click', '.contact-edit', function() {
//			$("#modal-contact").html('').html(template('tpl_contractmould'));
			var member_id = $(this).parents("tr").attr("member_id");
			var member_name = $(this).parents("tr").attr("member_name");
			var contract_id= $(this).parents("tr").attr("id");
			var id = $(this).parents("tr").attr("id");				
			var param = {};		       
	        param.contract_id = contract_id;//合同id
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/customer/getcontract";
			ajax.callback=function(data){
				$("#modal-contact").html('').html(template('tpl_contractmould',data));
				time_ymd();
			};
			ajax.post();
		})
//	编辑合同 end
//合同编辑中删除 start
		$(document).on('click', '.contract-list em', function() {
			var del_id = $(this).siblings("a").prop("id");
			$("#del_contact").append("<input type='hidden' name='delete_attach.attach_id' value='"+del_id+"'/>");
			$(this).parents(".contract-list").remove();
		})
//合同编辑中删除 end
//	       	删除合同 start
	       	$(document).on('click', '.contact-del', function() {
	       		var r = confirm("确定删除这个合同？");
		        if(r==true) {
		       		var contract_id= $(this).parents("tr").attr("id");
		       		var $this = $(this);
		       		var param = {};
			        param.contract_id = contract_id;//合同id
			        param.userid = userid;//操作者id
			        var ajax = new NpAjax();
			        ajax.param = param;
					ajax.url = "/api/customer/delcontract";
					ajax.callback=function(data){
						$(".close").click();
						OrionJump('.center-container','/companydetail?customer_id='+customer_id,false,function(){
							$('#maintab a').eq(4).click();
							$(".modal-backdrop").remove();
						});						
					};
					ajax.post();
			        
		            } else {
	            		return false
	            	}		        
				
			})	
//	       	删除合同 end
//	保存合同 start
			$(document).on('click', '.btn-savecontact', function() {
				var param = $("form").serializeObject ();	
				var attach_num = $(this).parents(".modal-footer").siblings(".modal-body").find(".data-list").size();
				var contract_id = $(this).parents(".modal").attr("contract_id");
				// var customer_id = $(this).parents(".modal").attr("customer_id");
				if(checkform("checkbox") == false)
		        {
		            return false
		        }			   		
				param.customer_id = customer_id;		//附件合同个数
				param.contract_id = contract_id;						//id
				param.member_id = userid;		//创建者id

				var ajax = new NpAjax();
		        ajax.param = param;
				ajax.url = "/api/customer/savecontract";
				ajax.callback=function(data){
					$(".close").click();
					OrionJump('.center-container','/companydetail?customer_id='+customer_id,false,function(){
						$('#maintab').find("a").eq(4).click();
						$(".modal-backdrop").remove();
					});
					
				};
				ajax.post();
			})
//	保存合同 end
		//删除合同文件
		$(document).on('click', '.data-list em', function() { 
			var $this = $(this);
			var param = {};
	        var param = new Object();
//	        param.userid = $(this).parents(".data-list").attr("id");   //操作者id
//	        param.ziliao_id = $(this).parents(".data-list").attr("name");	 //资料id
	        jQuery.ajax({	   
	            type: 'post',   
	            contentType : 'application/json; charset=utf-8',   
	            dataType: 'json',   
//	            url: logic_api_host + "/api/customer/delziliao",
	            data: JSON.stringify(param),   
	            success: function(data){
	            	$this.parents(".data-list").remove();
	            }
	        })
		})

	})
	
//	上传合同  start
	function uploadcontact(){
		var param = {};

	    $.ajaxFileUpload({
	        type: 'post',
	        url: logic_api_host+'/api/file/uploadtemp',
	        secureuri:false,
	        fileElementId: 'temp_file',
	        dataType: 'json',  
	        data: JSON.stringify(param),
	        success: function (data,status){
	        	if(data.maxSizeErr == "1"){
	        		alert('文件大小不得超过5M');
	        		return;
	        	}else if(data.type_error == "1"){
	        		alert("文件格式错误");
	        		return;
	        	}
		  		var str ='<div class="contract-list">'+
		    			'		<i class="glyphicon glyphicon-folder-open"></i>'+
		    			'		<a href="javascript:void(0);" no-nave="true"  title="">'+data.original_name+'</a>'+
		    			'		<em class="glyphicon glyphicon-remove"></em>'+
		    			'		<input type="hidden" name="attach_file_list.original_file_name" value="'+data.original_name+'">'+
		    			'		<input type="hidden" name="attach_file_list.temp_file_name" value="'+data.temp_file_name+'">'+
		    			'	</div>';
		  		$(".data-contactcon").append(str);
	        },error: function (data,status,e){  
	        	alert('上传失败,请重试。');
	        }
	    }); 
	}
	//	上传合同  end 