$(function(){
//	合伙人绩效时间 搜索确定按钮 start
	$(document).on('click', '.chanjixiaodatabtn', function() {
		var data1 = $("#data1").val();
		var data2 = $("#data2").val();
		if(moment(data1)>moment(data2)){
			alert("开始时间不能大于结束时间");
			return;
		}			
		OrionJump('.Channelcon','/Channel_jixiao?date_from='+data1+'&date_to='+data2,false);
	})		
//	合伙人绩效 时间搜索确定按钮 end

//	合伙人绩效详情 时间搜索确定按钮 start
	$(document).on('click', '.progess_databtn', function() {
		var data1 = $("#data1").val();
		var data2 = $("#data2").val();
		if(moment(data1)>moment(data2)){
			alert("开始时间不能大于结束时间");
			return;
		}
		OrionJump('.Channelcon','/Channel_progress?channel_openid='+channel_openid+'&date_from='+data1+'&date_to='+data2,false);
	})				
//	合伙人绩效详情 时间搜索确定按钮 end
	})
