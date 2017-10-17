(function ($) {
    
    $.fn.CountUpCircle = function(options){

    	var self = this;
	
	    /**
	    * DEFAULT OPTIONS
	    *
	    * Description
	    *
	    * @param 
	    **/

		var settings = $.extend({
			duration: 5000, //ms
			opacity_anim: false,
			step_divider: 1
		}, options);

		var toCount = parseInt(this.html());

		var i 	 		 = 0;
		var step 		 = settings.duration / (toCount / settings.step_divider);
		var procent_step = 1/(toCount / settings.step_divider);
		var displayNumber = function() {
			i=i+settings.step_divider;
			self.html(i);
			if (settings.opacity_anim){
				self.css({'opacity':procent_step*i});
			}
			if (i < toCount - settings.step_divider) {
				setTimeout(displayNumber, step);
			}
			else{
				setTimeout(set_endpoint, step);
			}
		};
		
		var set_endpoint = function (){
			self.html(toCount);
		}

		displayNumber();
	}

}(jQuery));
