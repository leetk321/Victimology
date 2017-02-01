jQuery(function($){
// FAQ
	var faq = $('#faq .article');
	faq.find('.a').hide();
	$('#faq .article .q').click(function(){
		var myFaq = $(this).parents('.article:first');
		if(myFaq.hasClass('hide')){
			faq.addClass('hide').removeClass('show');
			faq.find('.a').slideUp(100);
			myFaq.removeClass('hide').addClass('show');
			myFaq.find('.a').slideDown(100);
		} else {
			myFaq.removeClass('show').addClass('hide');
			myFaq.find('.a').slideUp(100);
		};
		return false
	});
});