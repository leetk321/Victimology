<?php
	if(!defined("__ZBXE__")) exit();
	if($called_position != "before_display_content") return;
	if($addon_info->adminpage_use == 'admin' && Context::get('module') == 'admin') return;
	
	if($addon_info->titlename_use != 'no'){
		$midname = Context::getBrowserTitle();
		if($addon_info->titletik_type == 'yes') $titletik = " " .$addon_info->titletik. " ";
		switch ($addon_info->titlename_use){
			case 'yesa': $title = $addon_info->titlename; break;
			case 'yesb': $title = $addon_info->titlename.''.$titletik.''.$midname; break;
			case 'yesc': $title = $midname.''.$addon_info->titletik.''.$addon_info->titlename; break;
		}
		Context::setBrowserTitle($title);
	}
	
	if($addon_info->www_use != 'no'){
		$siteurl = $addon_info->siteurl;
		if($addon_info->www_use == 'typea') {
			$script = "<script type=\"text/javascript\">if (!(location.host=='".$siteurl."')){window.location='http://".$siteurl."'+location.pathname+location.search}</script>";
		}else if($addon_info->www_use == 'typeb') {
			$script = "<script type=\"text/javascript\">if (!(location.host=='www.".$siteurl."')){window.location='http://www.".$siteurl."'+location.pathname+location.search}</script>";
		}
		Context::addHtmlHeader($script);
	}
?>