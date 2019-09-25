$(document).ready(function(){
	var ua = $.browser; /* Create a variable for browser info */
	$('.todo').hide(); /* Hide the content */

	/* If the Version or Firefox is < or = 5.0 the preloader not display, 
    the same function applies to old Version Safari and Chrome
    and finally Opera and IE they don't support CSS3 Animation */
	if (ua.mozilla && ua.version <='5.0' || ua.safari && (navigator.appVersion.indexOf('3.') != -1) || ua.opera || ua.msie){
    	/* If the condition is true the content will be displayed immediately */
    	$('.todo').show();
	} else {  /* Otherwise appears the preloader */
    	/* Insert the markup preloader usign jQuery */
    	$('body').append('<div id="preloader"><span class="expand"></span></div>');
    		/* The animation during 2sec, 
            change the delay parameter to extend or decrase the animation, 
            remember to change the duration of the animation also in CSS */
    	$('#preloader').delay(2000).fadeOut('slow', function() {
    		$('.todo').fadeIn('fast');  
		});  	
	}
});