$(document).ready(function(){
//	点击空白  start
//	$(document).on("click",function(e) {
//		var target = $(e.target);
//		if (target.closest(".seles_choose").length == 0 && target.closest(".doble_choose").length == 0) {
//			$('.doble_choose').hide();
//		}		
//		if (target.closest(".popselect-list").length == 0) {
//			$('.popselect-con').hide();
//		}				
//	})
//	点击空白  end
	$(document).on("click",'.popselect-list a',function() {
		$(this).siblings(".popselect-con").show();
		$(this).parents(".popselect-list").siblings(".popselect-list").find(".popselect-con").hide();
	})
})
