function displayResult(item, val, text) {
    $('.alert').attr("id",val).show().html('您选择了：<strong>' + text + '</strong>');
}

$(function () {
    $('#member-search').typeahead({
        source: [
		    { id: 1, name: '你好1' },
           
	    ],
        itemSelected: displayResult
    });   
    $('#channel-search').typeahead({
        source: [
		    
            { id: 4, name: '我是' },
            { id: 5, name: '我是高' },
            { id: 6, name: '我是高志一' },           
            { id: 14, name: '我是' },
            { id: 15, name: '我是高' },
            { id: 16, name: '我是高志一' },
          
	    ],
        itemSelected: displayResult
    });   

    $('#demo2').typeahead({
        source: [
		    { ID: 1, Name: 'Toronto' },
		    { ID: 2, Name: 'Montreal' },
		    { ID: 3, Name: 'New York' },
		    { ID: 4, Name: 'Buffalo' },
		    { ID: 5, Name: 'Boston' },
		    { ID: 6, Name: 'Columbus' },
		    { ID: 7, Name: 'Dallas' },
		    { ID: 8, Name: 'Vancouver' },
		    { ID: 9, Name: 'Seattle' },
		    { ID: 10, Name: 'Los Angeles' }
	    ],
        display: 'Name',
        val: 'ID',
        itemSelected: displayResult
    });

    $('#demo3').typeahead({
        source: [
		    { id: 1, full_name: 'Toronto', first_two_letters: 'To' },
		    { id: 2, full_name: 'Montreal', first_two_letters: 'Mo' },
		    { id: 3, full_name: 'New York', first_two_letters: 'Ne' },
		    { id: 4, full_name: 'Buffalo', first_two_letters: 'Bu' },
		    { id: 5, full_name: 'Boston', first_two_letters: 'Bo' },
		    { id: 6, full_name: 'Columbus', first_two_letters: 'Co' },
		    { id: 7, full_name: 'Dallas', first_two_letters: 'Da' },
		    { id: 8, full_name: 'Vancouver', first_two_letters: 'Va' },
		    { id: 9, full_name: 'Seattle', first_two_letters: 'Se' },
		    { id: 10, full_name: 'Los Angeles', first_two_letters: 'Lo' }
	    ],
        display: 'full_name',
        itemSelected: displayResult
    });

    // Mock an AJAX request
    $.mockjax({
        url: '/cities/list',
        responseText: [{ id: 1, name: 'Toronto' },
				    { id: 2, name: 'Montreal' },
				    { id: 3, name: 'New York' },
				    { id: 4, name: 'Buffalo' },
				    { id: 5, name: 'Boston' },
				    { id: 6, name: 'Columbus' },
				    { id: 7, name: 'Dallas' },
				    { id: 8, name: 'Vancouver' },
				    { id: 9, name: 'Seattle' },
				    { id: 10, name: 'Los Angeles' }]
    });

    $('#demo4').typeahead({
        ajax: '/cities/list',        
        itemSelected: displayResult
    });

    $('#demo5').typeahead({
        ajax: { url: '/cities/list', triggerLength: 1 }, 
        itemSelected: displayResult
    });
});