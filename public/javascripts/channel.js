	$(function(){
//		保存合伙人 start
		$(document).on('click', '.Channel_edit_save', function() {
			if($(this).hasClass('disabled'))
			{
				return;
			}
			//移动目标
	        var target_error = {};
	        if(jumpToform("edit_channel",target_error) == false){
	            goDiv(target_error.jumpid);
	        }
	        if(checkform("edit_channel") == false){	        	
				return
			}
			var param=$("form").serializeObject ();
			param.channel_openid = channel_openid;	
			param.master_openid = master_openid;
			if(channel_openid!=''){
				if(passflg=='0'){
					param.passwd = "";
				}	
			}
			
			var ajax = new NpAjax();
		    ajax.param = param;
			ajax.url = "/api/save_channel";
			ajax.callback=function(result){
				channel_openid=result.channel_openid;
				if(result.code== "-2"){
					alert("管理员账号已存在");
					return
				}
				OrionJump('.center-container','/Channel_detail?channel_openid='+channel_openid,true);//合伙人详情
			};
			ajax.post();
			$(this).addClass('disabled');
		})
//		保存合伙人 end

//		重置密码 start
		$(document).on('click', '.reseat_passwd', function() {
			passflg='1';
			$(this).hide();
			$(this).siblings("input").val("").removeAttr("disabled");
		})
//		重置密码 end
})
	
	