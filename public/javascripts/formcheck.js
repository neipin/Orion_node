$(document).ready(function(){
	
	//鼠标焦点离开
	$(document).on('blur', 'input', function() {
		format_check($(this));
		length_check($(this));		
	})
	
	//鼠标focusin
	$(document).on('focusin', 'input', function() {
		$(this).parents(".form-group").removeClass("has-error");
		$(this).siblings("span").text('');
	})
	$(document).on('focusin', 'textarea', function() {
		$(this).parents(".form-group").removeClass("has-error");
		$(this).siblings("span").text('');
	})
	$(document).on('click', 'select', function() { 
        $(this).parents(".form-group").removeClass("has-error");
		$(this).siblings("span").text('');
		$(this).parent("div").siblings("span.help-block").text('');
	}); 
})

//整个表单check
function checkform(divid)
{
	clearErrMsg();
	var chkret = true;
	$('#'+divid+' .np_form_check').each(function(index,item){
		if(chkret == require_check($(this)))
		{
			if(chkret == length_check($(this)) && chkret == format_check($(this)))
			{
				
			}
			else
			{
				chkret=false;
			}
		}
		else
		{
			chkret=false;
		}
	})
	return chkret;
}

//必填项check
function require_check(item)
{
	if(item.attr("np_require"))
	{
		if(getValue(item).length == 0)
		{			
			item.parents(".form-group").addClass("has-error");
			item.siblings("span").text(item.attr("placeholder"));		
			
//			item.siblings(".seles").addClass("mis_warning").removeClass("mis_active");
//			item.parents("div").siblings(".mis_alert").show().text(item.attr("err_require"));
//			item.addClass("mis_warning").removeClass("mis_active");
			
			return false;
		}
		else
		{
			return true;
		}
	}
}

//判断长度错误
function length_check(item)
{
	if(item.attr("np_max_length"))
	{
		if(getValue(item).length > item.attr("np_max_length"))
		{
			item.siblings(".mis_alert").text(item.attr("err_max_length"));
			item.siblings(".mis_alert").show();
			item.siblings(".seles").addClass("mis_warning").removeClass("mis_active");
			item.parents("div").siblings(".mis_alert").show().text(item.attr("err_require"));
			item.addClass("mis_warning").removeClass("mis_active");
			return false;
		}
	}
	return true;
} 

//格式check
function format_check(item)
{
	if(item.attr("np_format") == "email")
	{
		if(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(getValue(item)) == false ) 
		{
			item.siblings(".mis_alert").text(item.attr("err_format"));
			item.siblings(".mis_alert").show();
			item.siblings(".seles").addClass("mis_warning").removeClass("mis_active");
			item.parents("div").siblings(".mis_alert").show().text(item.attr("err_require"));
			item.addClass("mis_warning").removeClass("mis_active");
			return false;
		}
	}
	else if(item.attr("np_format") == "phone")
	{
		if(/^0{0,1}1(3|5|8|7|4)[0-9]{9}$/.test(getValue(item)) == false)
		{
			item.parents(".form-group").addClass("has-error");
			item.siblings("span").text(item.attr("err_format"));
			
//			item.siblings(".mis_alert").text(item.attr("err_format"));
//			item.siblings(".mis_alert").show();
//			item.siblings(".seles").addClass("mis_warning").removeClass("mis_active");
//			item.parents("div").siblings(".mis_alert").show().text(item.attr("err_require"));
//			item.addClass("mis_warning").removeClass("mis_active");
			return false;
		}
	}
	else if(item.attr("np_format") == "telephone")
	{
		if(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(getValue(item)) == false)
		{
			item.siblings(".mis_alert").text(item.attr("err_format"));
			item.siblings(".mis_alert").show();
			item.siblings(".seles").addClass("mis_warning").removeClass("mis_active");
			item.parents("div").siblings(".mis_alert").show().text(item.attr("err_require"));
			item.addClass("mis_warning").removeClass("mis_active");
			return false;
		}
	}
	
	return true;
}

function clearErrMsg()
{
//	$('.mis_alert').each(function(index,item){
//		$(this).text("");
//		$(this).hide();
//	})
	$('.help-block').text("");
	$(".form-group").removeClass("has-error");
}

function getValue(item)
{
	var value = "";
	if(item.is("input"))
	{
		value= item.val().trim();
	}
	else if(item.is("div"))
	{
		value = item.text().trim();
	}
	else if(item.is("textarea"))
	{
		value = item.val();
	}
	return value;
}