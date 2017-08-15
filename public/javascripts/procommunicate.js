	var change_url = node_url+'/projectdetail';
	$(function(){	
		$(document).on('mouseover', '.communication-list', function() {
			$(this).addClass("hover-bg").find(".commuite-operate").show();
		})
		$(document).on('mouseout', '.communication-list', function() {
			$(this).removeClass("hover-bg").find(".commuite-operate").hide();
		})			
		
//		删除聊天记录
		$(document).on('click', '.commuite-del', function() {
			var comm_id = $(this).siblings("a").attr("data-comm_id");			
			var param = {};
	        param.comm_id = comm_id;//沟通记录id	    
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/jobs/delcomm";
			ajax.callback=function(data){
				$(".close").click();
            	OrionJump('.tab-pane','/projectdetail?job_id='+job_id+'&rencaiflag=1',false,function(){
            		$('#maintab').find("a").eq(2).click();
            		$(".modal-backdrop").remove();
            	});            	
			};
			ajax.post();
		})
//		添加沟通记录 start
		$(document).on("click","#add-procommunite",function() {
			$("#modal-communite").html('').html(template('tpl_communitemould'));
		})
//		添加沟通记录 end
//		编辑沟通 start
		$(document).on("click",".commuite-operate .commuite-edit",function() {
			$("#modal-communite").html('').html(template('tpl_communitemould'));
			var comm_id = $("#modal-communite").attr("comm_id"); //沟通记录
			var param = {};
	        param.comm_id = comm_id;
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/jobs/getonecomm";
			ajax.callback=function(data){
				$("#modal-communite").html('').html(template('tpl_communitemould', data));
			};
			ajax.post();		 
		})		
//		编辑沟通 end

//		保存沟通 start
		$(document).on("click",".communite-save",function() {
			var comm_id = $("#modal-communite").attr("comm_id"); //	沟通记录id
			var content = $(this).parents(".modal-footer").siblings(".modal-body").find("textarea").val(); //沟通内容
			var param = {};
	        param.comm_id = comm_id;
	        param.content = content;
	        param.member_id = userid;
	        param.jobid = job_id;	  
	        if(content==""){
	        	$(".modal").modal("hide");
	        	$(".modal-backdrop").remove();
	        	return false;
	        }
	        var ajax = new NpAjax();
	        ajax.param = param;
			ajax.url = "/api/jobs/savecomm";
			ajax.callback=function(data){
				$(".close").click();
				OrionJump('.center-container','/projectdetail?job_id='+job_id+'&rencaiflag=1',false,function(){
					$('#maintab a').eq(2).click();
					$(".modal-backdrop").remove();
				});
				
			};
			ajax.post();
		})		 
//		保存沟通 start
	})