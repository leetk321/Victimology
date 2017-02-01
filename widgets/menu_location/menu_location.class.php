<?php
/**
 * @class menu_location
 * @author BNU (bnufactory@gmail.com)
 * @brief 메뉴 위치 출력 위젯
 * @version 0.2.1
 **/

class menu_location extends WidgetHandler {

    /**
     * @brief 위젯의 실행 부분
     *
     * ./widgets/위젯/conf/info.xml 에 선언한 extra_vars를 args로 받는다
     * 결과를 만든후 print가 아니라 return 해주어야 한다
     **/
    function proc($args) {
        // 레이아웃 정보를 가져옴
        $layout_info = Context::get('layout_info');
        $menu = Context::get($layout_info->default_menu);

        // 메뉴가 없을 경우 예외
        if(!$menu->list) return;

        $selected_node = $this->getSelectedNode($menu->list);
        $location[] = $selected_node;

        for($i = 1; $i < $menu->maxdepth; $i++) {
            if($selected_node['list']) {
                $selected_node = $this->getSelectedNode($selected_node['list']);
                if($selected_node) {
                    $location[] = $selected_node;
                }
            }
        }

        // 구분자가 없을 경우 '>'로 기본값 설정
        if(!$args->partition) $args->partition = '&gt;';

        Context::set('location', $location);
        Context::set('partition', $args->partition);

        // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
        $tpl_path = $this->widget_path.'skins/'.$args->skin;
        Context::set('colorset', $args->colorset);

        // 템플릿 파일을 지정
        $tpl_file = 'location';

        // 템플릿 컴파일
        $oTemplate = &TemplateHandler::getInstance();
        return $oTemplate->compile($tpl_path, $tpl_file);
    }

    function getSelectedNode($menu) {
        foreach($menu as $var) {
            if($var['selected'] == 1) {
                return $var;
            }
        }
    }

}
?>
