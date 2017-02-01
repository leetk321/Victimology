(function($) {
	$.fn.gyContentBlindGallery=function(options){  
		// default properties
		var defaults={
			item_count : 0,
			wrap_type : 'liquid', //fixed, liquid
			direction : 'left',
			thumbnail_width : 100,
			thumbnail_height : 100,
			blind_bg_color : '000000',
			blind_text_color : 'FFFFFF',
			blind_text_align : 'left',
			blind_text_size : '12',
			blind_opacity : 0.9,
			use_random_color: 'N',
			effect_num : 1,
			speed : 1000
		}; 
		
		var options=$.extend(defaults, options);
		
		return this.each(function() {
			var _this = $(this);
			var _this_li = _this.children('li');

			var arr_effect = new Array('easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInSine','easeOutSine','easeInOutSine','easeInExpo','easeOutExpo','easeInOutExpo','easeInCirc','easeOutCirc','easeInOutCirc','easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce');
			var arr_random_color = new Array('0598C3','2F4752','E40A5C','A7BC18', 'F59E19');
			var timer = null;
			var effect_str;
			var item_count = 0;
			var mouseover_num = -1;
;
			var init = function() {
				effect_str = arr_effect[options.effect_num];
				_this.attr('motion', effect_str);
				
				options.blind_opacity = (parseInt(options.blind_opacity) / 100);

				if(options.use_random_color == 'Y') {
					var n = Math.floor(Math.random() * arr_random_color.length);
					options.blind_bg_color = arr_random_color[n];
					//options.blind_text_color = 'FFFFFF';
				}

				if(options.wrap_type == 'fixed') {
					_this_width = parseInt(options.item_count) * (parseInt(options.thumbnail_width) + 28);
					_this.css('width', _this_width);
				}
				_this.find('.blind').css('background', '#'+options.blind_bg_color).css('opacity', options.blind_opacity);
				_this.find('.info').css('text-align', options.blind_text_align);
				_this.find('a').css('color', '#'+options.blind_text_color).css('font-size', parseInt(options.blind_text_size)+'px');

				_this.children('li').each(function(i){
					if(options.direction == 'right') {
						$(this).find('.blind').css('width', parseInt(options.thumbnail_width)+'px').css('height', parseInt(options.thumbnail_height)+'px').css('top', '0').css('right', -parseInt(options.thumbnail_width)+'px');
					} else if(options.direction == 'top') {
						$(this).find('.blind').css('width', parseInt(options.thumbnail_width)+'px').css('height', parseInt(options.thumbnail_height)+'px').css('left', '0').css('top', -parseInt(options.thumbnail_height)+'px');
					} else if(options.direction == 'bottom') {
						$(this).find('.blind').css('width', parseInt(options.thumbnail_width)+'px').css('height', parseInt(options.thumbnail_height)+'px').css('left', '0').css('bottom', -parseInt(options.thumbnail_height)+'px');
					} else {
						$(this).find('.blind').css('width', parseInt(options.thumbnail_width)+'px').css('height', parseInt(options.thumbnail_height)+'px').css('top', '0').css('left', -parseInt(options.thumbnail_width)+'px');						
					}

					$(this).find('.thumb').hover(
						function(){
							var index = $(this).parent().index();
							action(index);
							mouseover_num = index;
						},
						function(){
							mouseover_num = -1;
						}
					);

					$(this).find('.blind').hover(
						function(){
							var index = $(this).parent().index();
							action(index);
							mouseover_num = index;
						},
						function(){
							var index = $(this).parent().index();
							action(index);
							mouseover_num = -1;
						}
					);
				});
			};

			var action = function(index) {
				if(options.direction == 'right') {
					gogoRight(index);
				} else if(options.direction == 'top') {
					gogoTop(index);
				} else if(options.direction == 'bottom') {
					gogoBottom(index);
				} else {
					gogoLeft(index);
				}
				/*
				_this.children('li').eq(index).find('.blind').stop().animate(
					{'left' : '0px'}, 
					parseInt(options.speed), 
					effect_str,
					function(){
						if(mouseover_num != index) {
							$(this).stop().animate({'left' : -(parseInt(options.thumbnail_width))+'px'}, parseInt(options.speed), effect_str);
						}
					}
				);
				*/
			}
			var gogoLeft = function(index) {
				_this_li.eq(index).find('.blind').stop().animate(
					{'left' : '0px'}, 
					parseInt(options.speed), 
					effect_str,
					function(){
						if(mouseover_num != index) {
							$(this).stop().animate({'left' : -(parseInt(options.thumbnail_width))+'px'}, parseInt(options.speed), effect_str);							
						}
					}
				);
			}
			var gogoRight = function(index) {
				_this_li.eq(index).find('.blind').stop().animate(
					{'right' : '0px'}, 
					parseInt(options.speed), 
					effect_str,
					function(){
						if(mouseover_num != index) {
							$(this).stop().animate({'right' : -(parseInt(options.thumbnail_width))+'px'}, parseInt(options.speed), effect_str);
						}
					}
				);
			}
			var gogoTop = function(index) {
				_this_li.eq(index).find('.blind').stop().animate(
					{'top' : '0px'}, 
					parseInt(options.speed), 
					effect_str,
					function(){
						if(mouseover_num != index) {
							$(this).stop().animate({'top' : -(parseInt(options.thumbnail_height))+'px'}, parseInt(options.speed), effect_str);
						}
					}
				);
			}
			var gogoBottom = function(index) {
				_this_li.eq(index).find('.blind').stop().animate(
					{'bottom' : '0px'}, 
					parseInt(options.speed), 
					effect_str,
					function(){
						if(mouseover_num != index) {
							$(this).stop().animate({'bottom' : -(parseInt(options.thumbnail_height))+'px'}, parseInt(options.speed), effect_str);
						}
					}
				);
			}
			var getStrToNum = function(str, def_str) {
				var regexp_num = /^[0-9]+$/;
				if(!regexp_num.test(str)) return def_str;
				return str;
			}
			init();
		});
	};
})(jQuery);