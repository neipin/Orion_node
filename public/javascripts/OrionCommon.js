function NpAjax(){
        this.async = true;

        this.post = function(){
        var callback = this.callback;
               jQuery.ajax({   
                        type: 'post',   
                        contentType : 'application/json; charset=utf-8',   
                        dataType: 'json',   
                        async:this.async,
                        url: logic_api_host+this.url, 
                        data: JSON.stringify(this.param), 
                        success: function(data){
                                if(data.code && data.code=="-1")
                                {
                                        alert('服务器异常');
                                        console.log(data.msg);
                                        return;
                                }
                                callback(data);
                        }
                }); 
       };

       this.get = function(){
        
                jQuery.ajax({   
                        type: 'get',  
                        contentType : 'application/json; charset=utf-8',   
                        dataType: 'json',   
                        url: logic_api_host+this.url, 
                        data: '',   
                        success: function(data){
                                this.callback(data);
                        }
                });
        };

}

function OrionJump(divid_class,url,pushflag,callback)
{
	$(divid_class).addClass("loading");
	if (history.pushState) {
        $(divid_class).load(node_url+url,function(){
            $(divid_class).removeClass("loading");
            window.setTimeout(callback,500);
    	});
	    if(pushflag)
		{
	        // history处理
	        history.pushState({}, "", url);
       }
	}
}

function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}