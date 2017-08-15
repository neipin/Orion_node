var oldContent = "";//文本变化前的内容，使用它和新内容对比，发生了变化才发送ajax请求
var currentSelIndex = -1;  
var oldSelIndex = -1;
//	var change_url = node_url+'/projectdetail';
//	var itemmember = node_url+'/itemmember';
	$(function(){
		$(document).on('click', '.member-del', function() {	
			var r = confirm("确定删除此成员？");
			if (r==true) {
				var gc_id = $(this).parents("tr").prop("id"); //顾问id或渠道openid 
				var gc_kbn = $(this).parents("tr").attr("team_kbn");  //1:顾问；2：渠道
				var param = {};
		        param.gc_id = gc_id;
		        param.gc_kbn = gc_kbn;
		        param.job_id = job_id;  
		        var ajax = new NpAjax();
		        ajax.param = param;
				ajax.url = "/api/removefenpai";
				ajax.callback=function(data){
					OrionJump('.center-container','/projectdetail?job_id='+job_id+'&rencaiflag=1',false,function(){
						$('#maintab').find("a").eq(3).click();	
					});
				};
				ajax.post();		        
			}
		})
//	添加成员保存 start
		$(document).on('click', '.member-save', function() {	
			var gc_id = $("#gc_id").val(); //顾问id或渠道openid
			var gc_kbn = $(this).parents(".modal-footer").siblings(".modal-body").find("li.active").attr("value");  //1:顾问；2：渠道
			if(gc_id=="") {
				$(this).parents(".modal-footer").siblings(".modal-body").find(".alert").html("请搜索顾问或渠道，并选择！").show();
				return false;
			}
			var param = {};
	        param.gc_id = gc_id;
	        param.gc_kbn = gc_kbn;
	        param.job_id = job_id;
	        jQuery.ajax({	   
	            type: 'post',   
	            contentType : 'application/json; charset=utf-8',   
	            dataType: 'json',   
	            url: logic_api_host + "/api/jobfenpai",
	            data: JSON.stringify(param),   
	            success: function(data){
	            	$(".modal-backdrop").remove();
	            	OrionJump('.center-container','/projectdetail?job_id='+job_id+'&rencaiflag=1',false,function(){
						$('#maintab').find("a").eq(3).click();	
	            	});
		        }
			})				
		})
//  	添加成员保存 end
		$(document).on('click', '#poptab li', function() {
			$(this).addClass("active");
			$(this).siblings("li").removeClass("active");
			var con = $(this).text();
			if (con=="顾问"||con=="内部渠道") {
				$(".memberadd-con").find("p").text("请选择"+con+"：");
				$(".memberadd-itemguwen").show();
				$(".memberadd-itemchannel").hide();
			}else if(con=="合伙人"||con=="外部渠道") {
				$(".memberadd-con").find("p").text("请选择"+con+"：");
				$(".memberadd-itemguwen").hide();
				$(".memberadd-itemchannel").show();
			}
		})

//顾问、渠道模糊查询
	
	//顾问匹配  鼠标点击事件
	$(document).on('click', '.auto-search-ul li', function(event) { 
	    var e=window.event || event;
	    if(e.stopPropagation){
	        e.stopPropagation();
	    }else{
	        e.cancelBubble = true;
	    } 
	    var vals = $(this).text().replace(/(^\s*)|(\s*$)/g,"");
	    var guwen_id = $(this).attr("guwen_id");
	    $("#gc_id").val(guwen_id);
	    $(this).parents(".auto-search").siblings(".form-control").val(vals);
	    $(this).parents('.auto-search').hide();	
	});
	// 顾问匹配 start
	$(document).on('click', '#member-search', function() { 
		var $this = $(this);
		var param = new Object();
	    param.company_openid = company_openid;	    
	    var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/getAllGuwen";
		ajax.callback=function(data){
			if(data.guwenList.length > 0){
            	setTimeout(function(){
                     $this.siblings(".auto-search").slideDown();
                },500);
                $this.siblings(".auto-search").find(".auto-search-ul").html("");
                $this.siblings(".auto-search").find(".auto-search-ul").show();
                 var length = data.guwenList.length;
                  for(var i=0;i<length;i++){
          			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" guwen_id='+data.guwenList[i].guwen_id+'>'+data.guwenList[i].guwen_name+'</li>');
                  }
              }else{
                  $this.siblings(".auto-search").hide();
              }
		};
		ajax.post();
	});
	// 顾问匹配 end
	
// 渠道匹配 start
	$(document).on('click', '#channel-search', function() { 
		var $this = $(this);
		var param = new Object();
	    param.company_openid = company_openid;
	    var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/all_channel";
		ajax.callback=function(data){
			if(data.channel_list.length > 0){
            	setTimeout(function(){
                     $this.siblings(".auto-search").slideDown();
                },500);
                $this.siblings(".auto-search").find(".auto-search-ul").html("");
                $this.siblings(".auto-search").find(".auto-search-ul").show();
                 var length = data.channel_list.length;
                  for(var i=0;i<length;i++){
//	              			  data.channel_list[i].company_photo;
          			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" guwen_id='+data.channel_list[i].channel_openid+'>'+data.channel_list[i].channel_name+'</li>');
                  }
              }else{
                  $this.siblings(".auto-search").hide();
//	                    $this.parents(".gzjl_edit_list").css({"z-index":"0"});
              }
		};
		ajax.post();	    
	});
// 渠道匹配 end
	
	$(document).on('keyup', '#member-search', function(event) { 
		lastTime = event.timeStamp;
	//	headerloadflg="0";
		var $this = $(this);
		if ((event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)) {  
			selectItem_guwen(event);
			if(event.keyCode == 13){
	         	$this.siblings(".auto-search").hide();
	         	$this.siblings(".auto-search").find(".auto-search-ul").html("");
	         	 $("#member-search").val(company_name);
	         	guwen_id =$(this).attr("guwen_id");
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
	    var ajax = new NpAjax();
        ajax.param = param;
		ajax.url = "/api/getAllGuwen";  // 搜索顾问
		ajax.callback=function(data){
			if(data.guwenList.length > 0){
            	setTimeout(function(){
                	if(lastTime-event.timeStamp == 0){
                         $this.siblings(".auto-search").slideDown();
        				}
                },500);
                $this.siblings(".auto-search").find(".auto-search-ul").html("");
                $this.siblings(".auto-search").find(".auto-search-ul").show();
                 var length = data.guwenList.length;
//               if(length > 6){
//                   length = 6;
//                }
                  for(var i=0;i<length;i++){
          			  $this.siblings(".auto-search").find(".auto-search-ul").append('<li id="lk_'+i+'" guwen_id='+data.guwenList[i].guwen_id+'>'+data.guwenList[i].guwen_name+'</li>');
                  }
              }else{
                  $this.siblings(".auto-search").hide();
              }
		};
		ajax.post();
	});

})

function selectItem_guwen(event) {  
	var liLength = document.getElementById("guwenItems").getElementsByTagName("li").length;
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
		if ((document.getElementById("guwenItems").style.display == "" || document.getElementById("guwenItems").style.display != "none" ) && currentSelIndex != -1) {  
			company_name =$("#lk_" + currentSelIndex).text().replace(/(^\s*)|(\s*$)/g,"");
//          company_id = $("#lk_" + currentSelIndex).attr("gzjl_id");
//          company_photo = $("#lk_" + currentSelIndex).attr("company_photo");
            currentSelIndex = -1;  
            oldSelIndex = -1;  
		}  
	} 
}