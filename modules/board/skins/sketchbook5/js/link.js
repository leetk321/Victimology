// Link Board
jQuery(function($){
	$('#viewer_with').click(function(){
		location.reload();
		return false
	});
	if($('#viewer_with').hasClass('on')){
		var hx = $('#bd a.hx,#bd_lst .link_url a');
		hx.each(function(){
			$(this).attr('href',$(this).attr('href')+'?iframe=true&width=100%&height=100%').attr('rel','prettyPhoto[iframes]')
		});
		hx.prettyPhoto({hideflash:true,social_tools:false})
	}
});