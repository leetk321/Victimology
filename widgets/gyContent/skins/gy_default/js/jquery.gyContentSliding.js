(function($) {
	$.fn.gyContentSliding=function(options){  
		// default properties
		var defaults={
			effect_num : 1,
			speed : 1000
		}; 
		
		var options=$.extend(defaults, options);
		
		return this.each(function() {
			var _this = $(this);
			var _this_li = _this.children('li');

			var arr_effect = new Array('easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInSine','easeOutSine','easeInOutSine','easeInExpo','easeOutExpo','easeInOutExpo','easeInCirc','easeOutCirc','easeInOutCirc','easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce');
			var effect_str = '';
			var stime = 0;
			var item_num = 0;
			var item_count = 0;
			var ww;
			var wh;

			var init = function() {
				if($.browser.msie) {
					//if($.browser.version == '8.0') {
						return;
					//}
				} else if($.browser.mozilla) {
				} else if($.browser.safari) {
				} else if($.browser.opera) {
				}

				item_count = _this.children('li').size();
				effect_str = arr_effect[options.effect_num];

				ww = _this.parent().width();
				wh = _this.parent().height();

				if(ww == 0 || wh == 0) {
					ww = _this.parent().parent().width();
					wh = _this.parent().parent().height();
				}
				_this.css('width', parseInt(ww)+'px').css('height', parseInt(wh)+'px').css('overflow', 'hidden');
				_this_li.css('position', 'relative').css('left', '-'+parseInt(ww)+'px');

				setTimeout(ready, 1000);
			};
			var ready = function(n) {
				_this_li.each(function(i){
					setTimeout(action, stime, i);
					stime += 500;
				});
			}
			var action = function(n) {
				if(n == undefined) {
					n = item_num;
					item_num++;
				}

				_this_li.eq(n).animate(
					{left : 0},
					options.speed,
					function(){
					}
				);			
			}

			init();
		});
	};
})(jQuery);