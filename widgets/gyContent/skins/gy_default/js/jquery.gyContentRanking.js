(function($) {
	$.fn.gyContentRanking=function(options){  
		// default properties
		var defaults={
			ranking_width : 180,
			display_item_count : 10,
			effect_num : 22,
			use_effect : 'N',
			default_bg_color : 'FFFFFF',
			rolling_bg_color 	: 'F1F1F1',
			rolling_text_color : '999999',
			rank_border_color 	: 'CCCCCC',
			rank_bg_color 	: 'FFFFFF',
			rank_text_color 	: '333333',
			title_text_color 	: '333333',
			fluc_text_color 	: '0836A3',

			max_loop_count 	: 2,
			item_rolling_interval	: 1000,
			next_rolling_interval	: 0,
			restart_interval	: 3000
		}; 
		
		var options=$.extend(defaults, options);
		
		return this.each(function() {
			var _this = $(this);
			var _this_h2 = _this.children('h2');
			var _this_ul = _this.children('ul');
			var _this_li = _this_ul.children('li');

			var block_height;
			var arr_block = new Array();
			var arr_effect = new Array('easeInQuad','easeOutQuad','easeInOutQuad','easeInCubic','easeOutCubic','easeInOutCubic','easeInQuart','easeOutQuart','easeInOutQuart','easeInQuint','easeOutQuint','easeInOutQuint','easeInSine','easeOutSine','easeInOutSine','easeInExpo','easeOutExpo','easeInOutExpo','easeInCirc','easeOutCirc','easeInOutCirc','easeInElastic','easeOutElastic','easeInOutElastic','easeInBack','easeOutBack','easeInOutBack','easeInBounce','easeOutBounce','easeInOutBounce');
			var play_num = 0;
			var loop_num = 1;
			var timer = null;
			var effect_str;

			var li_height = 0;
			var li_padding = 0;
			var li_padding = 0;
			var item_count = 0;

			var rank_num_width;
			var rank_fluc_width;
			var rank_text_width;

			var init = function() {
				li_height = _this_ul.children('li').height();
				li_a_height = _this_ul.children('li').children('a').height();
				li_padding_top = _this_ul.children('li').children('a').css('padding-top');
				li_padding_bottom = _this_ul.children('li').children('a').css('padding-bottom');
				block_height = parseInt(li_height);

				if(block_height=='' || block_height==undefined || block_height==null) block_height = 24;

				item_count = _this_ul.children('li').size();
				if(item_count <= 1) return;

				if(parseInt(item_count) < parseInt(options.display_item_count)) {
					options.display_item_count = item_count;
				}

				_this_li.each(function(i){
					if(i >= options.display_item_count) {
						$(this).remove();			
					}
				});

				var strHTML;
				_this_li.each(function(i){
					arr_block[i] = $(this).html();
					$(this).empty();
						strHTML = '<div style="position: relative;" >';
						strHTML += '<div style="position: absolute; top: -'+block_height+'px; left: 0; width: 100%; background: #'+options.default_bg_color+';">'+arr_block[i]+'</div>';
						strHTML += '<div style="positi0n: absolute; top: 0; left: 0; width: 100%; background: #'+options.default_bg_color+';">'+arr_block[i]+'</div>';
						strHTML += '</div>';
						$(this).html(strHTML);


				});

				if(options.use_effect == 'Y') {
					effect_str = arr_effect[options.effect_num];
					_this.attr('motion', effect_str);
				}

				options.max_loop_count = getStrToNum(options.max_loop_count, 2);
				options.item_rolling_interval = getStrToNum(options.item_rolling_interval, 1000);
				options.next_rolling_interval = getStrToNum(options.next_rolling_interval, 0);
				options.restart_interval = getStrToNum(options.restart_interval, 3000);

				if(parseInt(options.item_rolling_interval) > 5000) options.item_rolling_interval = 5000;
				if(parseInt(options.next_rolling_interval) > 5000) options.next_rolling_interval = 5000;
				if(parseInt(options.restart_interval) > 5000) options.restart_interval = 5000;
				if(parseInt(options.max_loop_count) > 1000) options.max_loop_count = 1000;
			
				if(parseInt(options.ranking_width) < 160) options.ranking_width = 180;
				_this.css('width', options.ranking_width+'px');

				rank_num_width = $('.rank_num').outerWidth();
				rank_fluc_width = $('.rank_fluc').outerWidth();
				rank_text_width = (parseInt(options.ranking_width) - parseInt(rank_num_width) -  parseInt(rank_fluc_width) - 24);
				_this_li.find('.rank_text').css('width', rank_text_width+'px');
				
				var rank_box_height = (parseInt(block_height)  * parseInt(options.display_item_count));
				_this_ul.css('height', rank_box_height+'px').css('overflow', 'hidden');

				_this_li.find('.rank_text').css('color', '#'+options.title_text_color);
				
				if(options.max_loop_count > 0) animateRankBlock();
			};

			var animateRankBlock = function(){
				var obj = _this_li.eq(play_num).children('div').eq(0);
				obj.children('div').eq(1).css('background', '#'+options.rolling_bg_color);
				obj.children('div').eq(1).find('.rank_num').css('color', '#'+options.rolling_text_color);
				obj.children('div').eq(1).find('.rank_text').css('color', '#'+options.rolling_text_color).css('width', rank_text_width+'px');
				obj.children('div').eq(1).find('.rank_fluc').css('color', '#'+options.rolling_text_color);
				obj.animate({
					top: block_height+'px'
				},
				parseInt(options.item_rolling_interval),
				_this.attr('motion'),
				function() {
						_this_li.eq(play_num).prepend(getBlockData(play_num));
						_this_li.eq(play_num).children('div').eq(0).find('.rank_num').css('background', '#'+options.rank_bg_color).css('border', '1px solid #'+options.rank_border_color).css('color', '#'+options.rank_text_color);
						_this_li.eq(play_num).children('div').eq(0).find('.rank_text').css('color', '#'+options.title_text_color).css('width', rank_text_width+'px'); //.css('background', '#cccccc')
						_this_li.eq(play_num).children('div').eq(0).find('.rank_fluc').css('color', '#'+options.fluc_text_color);

						$(obj).remove();
						if(play_num >= (options.display_item_count-1)) {
							play_num = 0;
							loop_num++;
						} else {
							play_num++;
						}
						if(parseInt(loop_num) <= parseInt(options.max_loop_count)) {
							if(play_num==0) {
								timer = setInterval(animateRankBlock, options.restart_interval);
							} else {
								setTimeout(animateRankBlock, options.next_rolling_interval);
								clearInterval(timer);
							}
						}
				});
			};

			var getBlockData = function(n){
				var strHTML = '';
				strHTML += '<div style="position:relative; width: 100%;">';
				strHTML += '<div style="position:absolute; top:-'+block_height+'px; left:0; width:100%; background: #'+options.default_bg_color+';">'+arr_block[n]+'</div>';
				strHTML += '<div style="position:absolute; top:0; left:0; width:100%; background: #'+options.default_bg_color+';">'+arr_block[n]+'</div>';
				strHTML += '</div>';
				return strHTML;
			}
			var initNextTimeBoxNum = function(t1, max){
				if(parseInt(t1)==0) return max;
				else return parseInt(t1)-1;
			};

			var printEasingEffectList = function(){
				var arr_id = _this.attr('id').split('_');
				var ranking_id = 'easingListBox_'+arr_id[1];
				var strHTML='<div id="'+ranking_id+'" class="easingListBox" style="width: 300px; height: auto; border: 1px solid #ccc;">';
				var arr_effect_count = arr_effect.length;
				for(var i=0; i<arr_effect_count; i++){
					strHTML += '<a href="#'+arr_effect[i]+'" >'+arr_effect[i]+'</a> ';
				}
				strHTML += '</div>';
				$('.content').append(strHTML);
				$('#'+ranking_id).find('a').click(function(i){
					_this.attr('motion', $(this).text());
				});
			};

			var getStrToNum = function(str, def_str) {
				var regexp_num = /^[0-9]+$/;
				if(!regexp_num.test(str)) return def_str;
				return str;
			}
			init();
		});
	};
})(jQuery);