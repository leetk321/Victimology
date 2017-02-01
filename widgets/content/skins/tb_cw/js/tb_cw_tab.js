function content_widget_next(obj,list_per_page){
	var page = 1;
	var list = jQuery('>tbody>tr',obj);

	var total_page = parseInt((list.size()-1) / list_per_page,10)+1;
	list.each(function(i){
		if(jQuery(this).css('display') !='none'){
			page = parseInt((i+1)/list_per_page,10)+1;
			return false;
		}
	});
	if(total_page <= page) return;
	list.each(function(i){
		if( (page* list_per_page) <= i && ((page+1) * list_per_page) > i){
			jQuery(this).show();
		}else{
			jQuery(this).hide();
		}
	});
}

function content_widget_prev(obj,list_per_page){
	var page = 1;
	var list = jQuery('>tbody>tr',obj);

	var total_page = parseInt((list.size()-1) / list_per_page,10)+1;
	list.each(function(i){
		if(jQuery(this).css('display') !='none'){
			page = parseInt((i+1)/list_per_page,10)+1;
			return false;
		}
	});

	if(page <= 1) return;
	list.each(function(i){
		if( ((page-2)* list_per_page)<= i && ((page-1) * list_per_page) > i){
			jQuery(this).show();
		}else{
			jQuery(this).hide();
		}
	});
}

function content_widget_tab_show(tab,list,i){
	tab.parents('ul.widgetTab').children('li.active').removeClass('active');
	tab.parent('li').addClass('active');
	jQuery('>div',list).each(function(j){
			if(j==i) jQuery(this).addClass('active');
			else jQuery(this).removeClass('active');
	});
}