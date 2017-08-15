var NpAjax = {async:true};

NpAjax.ajax=function(){
	
	jQuery.ajax({   
        type: 'post',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        async:NpAjax.async,
        url: logic_api_host+NpAjax.url, 
        data: JSON.stringify(NpAjax.param), 
        success: function(data){
                if(data.code && data.code=="-1")
                {
                        alert('·þÎñÆ÷Òì³£');
                        return;
                }
        	NpAjax.callback(data);
        }
	});
}

NpAjax.ajaxget=function(){
	
	jQuery.ajax({   
        type: 'get',   
        contentType : 'application/json; charset=utf-8',   
        dataType: 'json',   
        url: NpAjax.url, 
        data: '',   
        success: function(data){
        	NpAjax.callback(data);
        }
	});
}
