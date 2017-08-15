var passflg='0';
$(function(){
	//保存按钮
	$(".new_CustomerSave").find("span").click(function(){
		var param = {};
		param.username=$("#username").val();
		param.gender=$("#gender").val();
		param.phone=$("#phone").val();
		param.email=$("#email").val();
		param.tel=$("#tel").val();
		param.weixin=$("#weixin").val();
		param.company=$("#company").val();
		param.department=$("#department").val();
		param.team=$("#team").val();
		param.position=$("#position").val();
		param.in_date=$("#in_from").val().replace(/(^\s*)|(\s*$)/g,"");
		param.zz_date=$("#zz_date").val().replace(/(^\s*)|(\s*$)/g,"");
		param.lz_date=$("#lz_date").val().replace(/(^\s*)|(\s*$)/g,"");
		param.status=$("#status").val();
		param.member_id=$("#member_id").val();
		param.account=$("#member_card").val();  //账号
		param.passwd=$("#member_passwd").val(); //密码
		
		if(checkform("newnum") == false)
        {
            return;
        }
		 if(param.member_id!=""){
			if(passflg=='0'){
				param.passwd = "";
			}	
		}
			
		jQuery.ajax({   
            type: 'post',   
            contentType : 'application/json; charset=utf-8',   
            dataType: 'json',   
            url: BaseJSURL+'/api/saveMember', 
            data: JSON.stringify(param),   
            success: function(date){
//          	if(date.dupicate == "1")
//        	  	{
//        	  		alert('账号重复，请重新填写账号');
//        	  		return;
//        	  	}
              //跳转到成员详情页
          	  if(date.member_id!=""){
          		window.location.href = BaseJSURL + "/opt/memberDetail?mid="+date.member_id+"&tflg=2";
          	  }
            },
            error: function (data,status,e){
            }
      });
	})
	
	//		重置密码
	$(".reseat_passwd").click(function(){
		passflg='1';
		$(this).hide();
		$(this).siblings("input").val("").removeAttr("disabled");
	})
})