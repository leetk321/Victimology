 /**
 * @
 * @file  jquery.gyContentAccordion.js
 * @author gayeon (ghkdwind@naver.com)
 * @brief  Accordion
 **/

(function($) {
	$.fn.gyContentAccordion = function(options) {

		var defaults = {
			'start_item_num' : 0,
			'mouse_event' : 'click',
			'header_bg_color' : 'F1F1F1',
			'header_text_color' : '333333',
			'content_bg_color' : 'FFFFFF',
			'content_text_color' : '666666',
			'border_color' : 'CCCCCC',
			'auto_slide' : 'N',
			'timeout'  : '3000',
			'speed'  : '600',
			'slide_type' : 'sh'
		}
		var options = $.extend(defaults, options);

		return this.each(function() {
			var _this = $(this);
			var _this_ul = _this.children('ul');
			var _this_li = _this_ul.children('li');
			var _this_li_a = _this_li.children('.ac_header');
			var _this_li_div = _this_li.children('.ac_content');

			var mouseover_num = -1;
			var item_num = 0;
			var item_count = 0;

			//init
			var init = function(){
				item_count = _this_li.size();

				_this_ul.css('border', '1px solid #'+options.border_color).css('border-bottom', '0');
				_this_li_a.addClass('right').css('background-color', '#'+options.header_bg_color).css('color', '#'+options.header_text_color).css('border-bottom', '1px solid #'+options.border_color);
				_this_li_div.css('background-color', '#'+options.content_bg_color).css('color', '#'+options.content_text_color).css('border-bottom', '1px solid #'+options.border_color);
				_this_li_div.children('a').css('background-color', '#'+options.content_bg_color).css('color', '#'+options.content_text_color);

				if(options.mouse_event == 'hover') {
					 mouseOverShow();
				} else {
					 mouseClickShow();
				}

				var obj = getObj(options.start_item_num);
				action(obj);

				//auto start
				if(options.auto_slide == 'Y') play();
			}

			var mouseOverShow = function(){
				_this_li_a.hover(
					function() {
						mouseover_num = $(this).parent().index();
						item_num = mouseover_num;
						if(options.auto_slide == 'Y') stop();
						action($(this));

					},
					function(){
						mouseover_num = -1;
						if(options.auto_slide == 'Y') 	play();
					}
				).next().hide();
			}

			var mouseClickShow = function(){
				_this_li_a.hover(
					function(){
						mouseover_num = $(this).parent().index();
						if(options.auto_slide == 'Y') stop();
					},
					function(){
						mouseover_num = -1;
						if(options.auto_slide == 'Y') 	play();
					}
				).click(function() {
					mouseover_num = $(this).parent().index();
					item_num = mouseover_num;
					if(options.auto_slide == 'Y') 	stop();

					action($(this));
				}).next().hide(); // hide div
			}

			var action = function(obj) {
				var disp = obj.next().css('display');
				if(disp == 'block') return;

				_this_li_a.removeClass('down').addClass('right');
				obj.addClass('down');

				if(options.slide_type == 'ud') {
					_this_li_a.next().slideUp(parseInt(options.speed));
					obj.next().slideDown(parseInt(options.speed));		
				} else {
					_this_li_a.next().hide(parseInt(options.speed));
					obj.next().show(parseInt(options.speed));	
				}
			}

			var getStrToNum = function(str, def_str) {
				var regexp_num = /^[0-9]+$/;
				if(!regexp_num.test(str)) return def_str;
				return str;
			}

			var gogo = function(n) {
				if(options.auto_slide == 'Y') {
					if(n >= 0) {
						item_num = n;
						stop();
					} else {
						if(item_num >= item_count-1) item_num = 0;
						else item_num++;

						var obj = getObj(item_num);
						action(obj);
					}
				}
			}

			var getObj = function(n) {
				return _this_li.eq(n).children('a');
			}

			var play = function() {
				if(mouseover_num < 0) {
					tid = setInterval(gogo, parseInt(options.timeout), -1);
				} else {
					clearInterval(tid);
				}
			}

			var stop = function(){
				clearInterval(tid);
			}

			init();
		});
	}
})(jQuery);