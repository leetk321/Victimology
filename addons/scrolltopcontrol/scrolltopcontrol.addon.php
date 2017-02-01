<?php
/**
	* @file scrolltopcontrol.addon.php
	* @author Sulli (admin@admin.kr)
	* @brief scrolltopcontrol
**/

if(!defined("__XE__")) exit();
if($called_position == 'before_module_proc') {

	Context::addCSSFile("./addons/scrolltopcontrol/css/scrolltopcontrol.css", false);
	
	$startline = $addon_info->startline;
		if (empty($startline))$startline = '100';
	$scrollduration = $addon_info->scrollduration;
		if (empty($scrollduration))$scrollduration = '1000';
		
	$to_top = "
	<script type='text/javascript'>
		jQuery(function($){
			$('#scrolltotop').hide();
			$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > {$startline}) {
						$('#scrolltotop').fadeIn();
					} else {
						$('#scrolltotop').fadeOut();
					}
				});
				$('#scrolltotop a').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, {$scrollduration});
					return false;
				});
			});
		});
	</script>
	<div id=\"scrolltotop\"><a href=\"#top\"><span></span></a></div>
	";
	Context::addHtmlFooter($to_top);
}
?>