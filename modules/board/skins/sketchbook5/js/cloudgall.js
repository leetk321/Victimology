// Cloud Gallery
jQuery(function($){
	var cGall = $('#cloud_gall');
	var cgRt = $('#cg_rt');
	var cgRd = $('#cg_rd');

	counts = [cloud_z+1];
	cGall.find('a').draggable({
		containment:"document",
		start: function(){
			$(this).css('zIndex',counts[0]++)
		}
	});
    function cloud(){
		cGall.find('a').each(function(){
			var t = $(this)
			var m = Math.floor(Math.random()*cloud_deg*2-cloud_deg);
			t.css({
				top:Math.floor(Math.random()*(cloud_y-thumbnail_width-51)),
				left:Math.floor(Math.random()*(cGall.width()-(thumbnail_width+22))),
				'msTransform':'rotate('+m+'deg)',
				'-moz-transform':'rotate('+m+'deg)',
				'-webkit-transform':'rotate('+m+'deg)'
			});
			t.imagesLoaded(function(){
				t.fadeIn(200)
			})
		})
    };
	function yesRand(){
		cGall.removeClass('no_rd');
		cgRd.removeClass('off');
		$.cookie('cg_rd',null);
		cloud();
	};
	function noRand(){
		cGall.addClass('no_rd').css('height','');
		cgRd.addClass('off');
		$.cookie('cg_rd','N');
		noRotate();
		cGall.imagesLoaded(function(){
			if($(window).width()<534){
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true
				})
			} else {
				cGall.masonry({
					itemSelector:'a',
					isFitWidth:true,
					isAnimated:true,
					animationOptions:{duration:500,easing:'easeInOutExpo',queue:false}
				})
			};
			$(this).find('a').fadeIn(200)
		})
	};
	function yesRotate(){
		if(cGall.hasClass('no_rd')) return true;
		cGall.removeClass('no_rt');
		cgRt.removeClass('off');
		$.cookie('cg_rt',null)
	};
	function noRotate(){
		cGall.addClass('no_rt');
		cgRt.addClass('off');
		$.cookie('cg_rt','N')
	};

	$('#cg_rf').click(function(){
		if(cgRd.hasClass('off')){
			cGall.removeClass('no_rd');
			$('#cg_rd').removeClass('off');
			$.cookie('cg_rd',null)
		};
		cloud()
	});
	$('#cg_rd').click(function(){
		if(cgRd.hasClass('off')){
			yesRand()
		} else {
			noRand()
		}
	});
	$('#cg_rt').click(function(){
		if(cgRt.hasClass('off')){
			yesRotate()
		} else {
			noRotate()
		}
	});

	if($(window).width()<534 || cgRd.hasClass('off')){
		noRand()
	} else {
		cloud();
		if(cgRt.hasClass('off')) noRotate()
	};
});