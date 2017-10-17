jQuery(document).ready(function(){
	if( $('.cd-stretchy-nav').length > 0 ) {
		var stretchyNavs = $('.cd-stretchy-nav');
		
		stretchyNavs.each(function(){
			var stretchyNav = $(this),
				stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');
			
			stretchyNavTrigger.on('click', function(event){
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function(event){
			( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
		});
	}

	$('select[name=screensize]').change(function() {
		if (this.value == '1') {
			$('.phone-shape').animate({width: '320',height: '490'});
			$('.phone-screen').animate({width: '320',height: '480'});
		}
		else if (this.value == '7') {
			$('.phone-shape').animate({width: '340',height: '550'});
			$('.phone-screen').animate({width: '340',height: '540'});
			$('.circle-button').css('display', 'none');
		}
		else if (this.value == '2') {
			$('.phone-shape').animate({width: '375',height: '560'});
			$('.phone-screen').animate({width: '375',height: '550'});
			$('.circle-button').css('display', 'block');
		}
		else if (this.value == '6') {
			$('.phone-shape').animate({width: '400',height: '610'});
			$('.phone-screen').animate({width: '400',height: '600'});
			$('.circle-button').css('display', 'none');
		}
		else if (this.value == '3') {
			$('.phone-shape').animate({width: '640',height: '631'});
			$('.phone-screen').animate({width: '640',height: '641'});
			$('.circle-button').css('display', 'none');
		}
		else if (this.value == '4') {
			$('.phone-shape').animate({width: '768',height: '631'});
			$('.phone-screen').animate({width: '768',height: '641'});
			$('.circle-button').css('display', 'none');
		}
		else if (this.value == '5') {
			$('.phone-shape').animate({width: '1024',height: '631'});
			$('.phone-screen').animate({width: '1024',height: '641'});
			$('.circle-button').css('display', 'none');
		}
		else {
			$('.phone-shape').animate({width: '375',height: '560'});
			$('.phone-screen').animate({width: '375',height: '550'});
			$('.circle-button').css('display', 'block');
		}
	});
});