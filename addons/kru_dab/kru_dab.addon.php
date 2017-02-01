<?php
	if(!defined('__ZBXE__')) return; // 1.5~7.x 적용 구문.
	if(Context::get('module')=='admin' || $called_position != 'before_display_content') return; // 관리자 페이지 적용 제외. || 화면에 디스플레이 할때만 동작
	// License: Creative Commons License Attribution-ShareAlike 2.0 Korea (저작자표시-동일조건변경허락 2.0 대한민국) http://creativecommons.org/licenses/by-sa/2.0/kr/
	// Author: Name: 안태룡(AN TAERYONG) / Nick: OEZ

	$logged_info = Context::get('logged_info');

	if($addon_info->status == 'N' && $logged_info->is_admin){ // 애드온 실행설정이면서 관리자로그인일때 작동.
		Context::set("admin_bar", "false");
	};
	
	return;// 애드온 종료.
?>