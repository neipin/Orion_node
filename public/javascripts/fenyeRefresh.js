//	<!--新分页-->
	function fenyeRefresh(yemianflg){
		$.jqPaginator('#pagination1', {
	        totalPages: (totalPage*1),
	        visiblePages: 10,
	        currentPage: currPage,
	        wrapper:'<ul class="pagination"></ul>',
	        first: '<li class="first"><a href="javascript:void(0);" no-nave="true">首页</a></li>',
	        prev: '<li class="prev"><a href="javascript:void(0);" no-nave="true">上一页</a></li>',
	        next: '<li class="next"><a href="javascript:void(0);" no-nave="true">下一页</a></li>',
	        last: '<li class="last"><a href="javascript:void(0);" no-nave="true">末页</a></li>',
	        page: '<li class="page"><a href="javascript:void(0);" no-nave="true">{{page}}</a></li>',
	        onPageChange: function (page) {
	        	if(page!=currPage){
	        		loaddata(page);
	        	}			
	        }
	    });	
	}
