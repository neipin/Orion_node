
$(function(){
//	保存成员 start
	$(document).on('click', '.member_save', function() {
		if($(this).hasClass('disabled'))
		{
			return;
		}
//	移动目标
        var target_error = {};
        if(jumpToform("editmember",target_error) == false){
            goDiv(target_error.jumpid);
        }
		var param = $("#editmember").serializeObject ();	
		if(checkform("editmember") == false)  //||checkform("editcontact") == false
        {
            return 
        }
        if(param.member_id!=""){
			if(passflg=='0'){
				param.passwd = "";
			}	
		}
        var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/saveMember";
		ajax.callback=function(data){
//			if(data.dupicate == "1") {
//    	  		alert('账号重复，请重新填写账号');
//    	  		return;
//    	  	}
			if(data.member_id!=""){
			 	OrionJump('.center-container','/memberdetail?member_openid='+data.member_id,true);					 	
				$(".modal-backdrop").remove();
			}					
		};
		ajax.post();
		$(this).addClass('disabled');
	})
})
