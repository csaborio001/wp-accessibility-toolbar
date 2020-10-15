var affectedElements = jQuery("p, h1, h2, h3, h4, h5, button, a, div, input, span, li, ul"); // Can be extended, ex. $("div, p, span.someClass")
var originalLineHeight = jQuery("body").css("line-height");
var DEBUG = true;

if ( Cookies.get('fontSizeButtonPressedCounter') != 0 ) {
	if ( DEBUG ) {
		console.log('Cookie found for fontSizeButtonPressedCounter, loading that size: ' + Cookies.get('fontSizeButtonPressedCounter'));
	}
	// restoreFontSize(parseInt(Cookies.get('fontSizeButtonPressedCounter')));
}

if (Cookies.get("font-family") == "opendyslexicregular" ) {
	restoreDyslexicFont();
}

// Storing the original size in a data attribute so size can be reset
affectedElements.each( function(){
	var $this = jQuery(this);
	$this.data("orig-size", $this.css("font-size") );
});

if ( window.jQuery ) {
	jQuery( function($) {
		$( '#btn-orig' ).on( 'click' , (function(event){
			restoreFontDefaults();
		}));
	});

	jQuery( function($) {
		$( '#btn-increase' ).on( 'click' , (function(event){
			changeFontSize(1);
		}));
	});

	jQuery( function($) {
		$( '#btn-dis' ).on( 'click' , (function(event){
			var element = $('#page').children();
			element.each(function (i) {
				$(this).css('font-family','opendyslexicregular');  
			});
		}))
	});

	function changeFontSize(direction){
		// Set initial value for    
		var currentLineHeightCookieValue = parseInt(jQuery("body").css("line-height"));
		
		// Increment the font of every element by one.
		affectedElements.each( function(){
			var $this = jQuery(this);
			$this.css( "font-size" , parseInt($this.css("font-size")) + direction );
		});
		// Increase Line Height of all elements by one.
		if ( DEBUG ) {
			console.log("Line Height about to increment from: " + currentLineHeightCookieValue );
		}
		currentLineHeightCookieValue =  (currentLineHeightCookieValue) + direction + 'px';
		(jQuery("body").css("line-height", currentLineHeightCookieValue));
		if ( DEBUG ) {
			console.log("Line incremented to: " + currentLineHeightCookieValue );
		}

		// Set default value in case the value is not in the cookies.
		var fontSizeButtonPressedCounter = direction;

		if (Cookies.get("fontSizeButtonPressedCounter") != 0 ) {
			fontSizeButtonPressedCounter = Cookies.get("fontSizeButtonPressedCounter");
			++fontSizeButtonPressedCounter; 
		}
		if (Cookies.get("accessibility-line-height-size") != null) {
			currentLineHeightCookieValue = parseInt(Cookies.get("accessibility-line-height-size"));
			++currentLineHeightCookieValue; 
		}
		if ( DEBUG ) {
			console.log('Setting fontSizeButtonPressedCounter cookie to ' + fontSizeButtonPressedCounter);
		}
		Cookies.set("fontSizeButtonPressedCounter", fontSizeButtonPressedCounter, { expires: 7 });
		if ( DEBUG ) {
			console.log('Setting line height cookie to ' + currentLineHeightCookieValue);
		}
		Cookies.set("accessibility-line-height-size", currentLineHeightCookieValue + 'px', { expires: 7 });
	}

	function restoreFontDefaults() {
		Cookies.set('fontSizeButtonPressedCounter', 0, { expires: 7 });
		Cookies.set('accessibility-line-height-size', originalLineHeight, { expires: 7 });
		Cookies.set("font-family", "asap", { expires: 7 });
		  affectedElements.each( function(){
				var $this = jQuery(this);
				$this.css( "font-size" , $this.data("orig-size") );
		   });
		   jQuery("body").css("line-height", originalLineHeight);                
	}	
};