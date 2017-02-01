function gyContent_widget_next(obj, list_per_page){
    var page = 1;
    if(obj.is('table')) {
        var list = jQuery('>tbody>tr',obj);
    } else if(obj.is('ul')) {
        var list = jQuery('>li',obj);
    }

    var total_page = parseInt((list.size()-1) / list_per_page,10)+1;

    list.each(function(i){
        if(jQuery(this).css('display') !='none'){
            page = parseInt(i/list_per_page,10) + 1;
            return false;
        }
    });

    if(total_page <= page) return;
    list.each(function(i){
        if( (page* list_per_page) <= i && ((page+1) * list_per_page) > i){
           jQuery(this).show();
		   jQuery(this).css('opacity', 0);
		   jQuery(this).animate({opacity : 1},1000);
        }else{
            jQuery(this).hide();
			jQuery(this).css('opacity', 1);
			jQuery(this).animate({opacity : 0},1000);
        }
    });
}

function gyContent_widget_prev(obj,list_per_page){
    var page = 1;
    if(obj.is('table')){
        var list = jQuery('>tbody>tr',obj);
    }else if(obj.is('ul')){
        var list = jQuery('>li',obj);
    }

    var total_page = parseInt((list.size()-1) / list_per_page,10)+1;
    list.each(function(i){
        if(jQuery(this).css('display') !='none'){
            page = parseInt(i/list_per_page,10)+1;
            return false;
        }
    });

    if(page <= 1) return;
    list.each(function(i){
        if( ((page-2)* list_per_page)<= i && ((page-1) * list_per_page) > i){
			jQuery(this).show();
			jQuery(this).css('opacity', 0);
			jQuery(this).animate({opacity : 1},1000);
        }else{
            jQuery(this).hide();
			jQuery(this).css('opacity', 1);
			jQuery(this).animate({opacity : 0},1000);
        }
    });
}

function gyContent_widget_tab_show(tab,list,i){
    tab.parents('ul.gyWidgetTab').children('li.active').removeClass('active');
    tab.parent('li').addClass('active');
    jQuery('>dd',list).each(function(j){
            if(j==i) jQuery(this).addClass('open');
            else jQuery(this).removeClass('open');
            });
}
