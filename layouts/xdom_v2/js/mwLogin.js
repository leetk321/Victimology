jQuery(function($){
	var loginWindow = $('.mwLogin');
	var loginW = $('#loginW');
	var uid = $('.iText.uid');
	var upw = $('.iText.upw');
	var oid = $('.iText.oid');
	
	// Show Hide
	$('.loginTrigger').click(function(){
		loginWindow.addClass('open');
	});
	$('#loginW .close').click(function(){
		loginWindow.removeClass('open');
	});
	// oLogin
	$('.oAnchor').click(function(){
		loginW.removeClass('gLogin');
		loginW.addClass('oLogin');
	});
	// gLogin
	$('.gAnchor').click(function(){
		loginW.removeClass('oLogin');
		loginW.addClass('gLogin');
	});
	// Warning
	$('#keepidW').change(function(){
		if($('#keepidW[checked]')){
			$('.warning').toggleClass('open');
		};
	});
	// Input Clear
	var iText = $('.iClear>.iLabel').next('.iText');
	$('.iClear>.iLabel').css('position','absolute');
	iText
		.focus(function(){
			$(this).prev('.iLabel').css('visibility','hidden');
		})
		.blur(function(){
			if($(this).val() == ''){
				$(this).prev('.iLabel').css('visibility','visible');
			} else {
				$(this).prev('.iLabel').css('visibility','hidden');
			}
		})
		.change(function(){
			if($(this).val() == ''){
				$(this).prev('.iLabel').css('visibility','visible');
			} else {
				$(this).prev('.iLabel').css('visibility','hidden');
			}
		})
		.blur();
	// ESC Event
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true;
		if (loginWindow.hasClass('open')) {
			loginWindow.removeClass('open');
		}
		return false;
	});
	// Hide Window
	loginWindow.find('>.bg').mousedown(function(event){
		loginWindow.removeClass('open');
		return false;
	});
});

