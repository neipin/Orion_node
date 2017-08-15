//	日期格式化 start
//	$(function(){
//
//		$(".updatatime").each(function(){
//			var con = $(this).text(); 
//			if(con==""||con==undefined||con==null){							
//				return
//			}
//			con = parseInt(con);					
//			var tt = moment(con).format("YYYY-MM-DD");			
//			$(this).text(tt);	
//			
//		})
//	
//	})
//	日期格式化 end


//window.onload=updatatime;

//$(window).load(function() {  
// updatatime();
//});  
function updatatime(){
	$(".updatatime").each(function(){
		var con = $(this).text(); 
		if(con==""||con==undefined||con==null){							
			return
		}
		con = parseInt(con);					
		var tt = moment(con).format("YYYY-MM-DD");			
		$(this).text(tt);	
		
	})
}
