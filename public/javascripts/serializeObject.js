$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    var count = {};
    $.each(a, function () {
    	
    	var list_key='';
    	var list_child_key = '';
    	var s = this.name.split('.');
    	if(s.length > 1)
    	{
    		list_key = s[0];
    		list_child_key = s[1];
    		if(count[list_key+'.'+list_child_key] !== undefined)
    		{
    			count[list_key+'.'+list_child_key] = count[list_key+'.'+list_child_key] + 1; 
    		}else{
    			count[list_key+'.'+list_child_key] = 1;
    		}
    		
    		if (o[list_key] !== undefined) {
				var index = count[list_key+'.'+list_child_key]-1;
				if(o[list_key][index] !== undefined)
				{
					o[list_key][index][list_child_key]=this.value;
				}
				else{
					var child = {};
	        		child[list_child_key] = this.value || '';
					o[list_key].push(child);
				}
    			
    			
//	            if (!o[this.name].push) {
//	                o[this.name] = [o[this.name]];
//	            }
//	            o[this.name].push(this.value || '');
	        } else {
	        	var child = {};
	        	child[list_child_key] = this.value || '';
	        	o[list_key] = new Array();
	        	o[list_key].push(child);//{"lastname":"gates"}
//	            o[this.name] = this.value || '';
	        }
    	}
    	else{
    		if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
    	}
    	
        
    });
    var $radio = $('input[type=radio],input[type=checkbox],input[type=text].input_hideen',this);
    $.each($radio,function(){
        if(!o.hasOwnProperty(this.name)){
            o[this.name] = '';
        }
    });
    return o;
};