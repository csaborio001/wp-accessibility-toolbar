/**
 * Loaded automatically by class AssetLoader.
 * 
 * v0.0.1
 */

(function ($) {
	
	const DEBUG = true;
	const MAX_ZOOM = 5;
	const MIN_ZOOM = 2;



	if ( DEBUG ) {
		console.log( `Local textButtonClicked: ${textButtonClicked}`);
		console.log( `Cookie textButtonClicked: ${Cookies.get('textButtonClicked')}`);
	}
	/*------------------------------------------------------------------
	|																	|
	|							Initialization		  				|
	|																	| 
	--------------------------------------------------------------------*/
	restoreFontSizeFromCookie();
	restoreFontFromCookie();
	var textButtonClicked;
	if (isNaN(textButtonClicked)) {textButtonClicked = 0 };
	$('body').FontSize({
		increaseBtn: '#btn-increase',
		reduceBtn: '#btn-decrease',
		increaseTimes: MAX_ZOOM,
		decreaseTimes: MIN_ZOOM,
		step: 1,
	});
	
	/*------------------------------------------------------------------
	|																	|
	|							Event Handlers			  				|
	|																	| 
	--------------------------------------------------------------------*/

	$('#btn-increase').on('click', function() {
		registerFontSizeChange('+');
		if (DEBUG) {
			displayButtonInformation(this)
		}
	});

	$('#btn-decrease').on('click', function() {
		registerFontSizeChange('-');
		if (DEBUG) {
			displayButtonInformation(this)
		}
	});

	$('#btn-reset').on('click', function() {
		resetFontSize();
		restoreFont();
		if (DEBUG) {
			displayButtonInformation(this)
		}
	});

	$('#btn-dyslexic').on('click', function() {
		toggleDyslexicFont();
		if (DEBUG) {
			displayButtonInformation(this)
		}
	});	

	/*------------------------------------------------------------------
	|																	|
	|							Reset Routines			  				|
	|																	| 
	--------------------------------------------------------------------*/
	function resetFontSize() {
			if (DEBUG) {
				console.log('Resetting font values...');
			}
			cookieTextButtonClicked = parseInt(Cookies.get('textButtonClicked'));
			if ( isNaN(cookieTextButtonClicked) || 0 == cookieTextButtonClicked ) {
				return 0;
			}

			if ( cookieTextButtonClicked > 0 ) {
				for( i = cookieTextButtonClicked; i > 0; i--) {
						$('#btn-decrease').click();
				} 
			}

			if ( cookieTextButtonClicked < 0 ) {
				for (i = cookieTextButtonClicked; i < 0; i++) {
					$('#btn-increase').click();
				}
			}

			Cookies.set('textButtonClicked', 0);
			textButtonClicked = 0;
	}

	/*------------------------------------------------------------------
	|																	|
	|							Font Routines			  				|
	|																	| 
	--------------------------------------------------------------------*/

	function registerFontSizeChange(direction) {
		/* Font size increased, and we have not passed the max number of times
		 * we can increase the font.
		 */
		if ( '+' === direction && textButtonClicked < MAX_ZOOM ) {
			textButtonClicked++;
		/* Font size decreased, and we have not passed the max number of times
		 * we can decrease the font.
		 */
		} else if( '-' === direction && textButtonClicked > MIN_ZOOM - 2*MIN_ZOOM) {
			textButtonClicked--;
		}
		Cookies.set( 'textButtonClicked', textButtonClicked);
		if (DEBUG) {
			console.log( `textButtonClicked Cookie: ${Cookies.get( 'textButtonClicked')}`)
		}
	}

	function restoreFontSizeFromCookie() {
		if (DEBUG) {
			console.log('Restoring font values...');
		}
		cookieTextButtonClicked = parseInt(Cookies.get('textButtonClicked'));
		if (DEBUG){
			console.log(`Restoring Clicked Value: ${cookieTextButtonClicked}`);
		}
		// If number can't be parsed or it's zero (meaning it's the default size).
		if (isNaN(cookieTextButtonClicked) || cookieTextButtonClicked === 0) {return 0;}
		// If number is positive, we need to decrease it.
		if (cookieTextButtonClicked > 0 ) {
			$(document).ready( function() {
				for ( i = cookieTextButtonClicked; i > 0; i-- ) {
					$('#btn-increase').click();
				}
			});

		} else { // If number is negative, we need to increase it.
			$(document).ready( function() {
				for ( i = cookieTextButtonClicked; i < 0; i++ ) {
					$('#btn-decrease').click();
				}
			});
		}
		textButtonClicked = cookieTextButtonClicked;
	}

	/*------------------------------------------------------------------
	|																	|
	|							Dyslexic Font Routines			  		|
	|																	| 
	--------------------------------------------------------------------*/

	function toggleDyslexicFont() {
		var currentFont;
		cookieFont = Cookies.get('currentFont');
		/** There is no cookie set with the current font, must be first load. */
		currentFont = $(document.body).css('font-family');
		if ( 'opendyslexicregular' !== currentFont ) {
			/** Need to get this font name somewhere for the reset. */
			Cookies.set('originalFont', currentFont);
		}

		// Switch to open dyslexic.
		if ( 'opendyslexicregular' !== currentFont ) {
			Cookies.set( 'currentFont', 'opendyslexicregular');
			$(document.body).css('font-family', 'opendyslexicregular');
		} else {
			restoreFont();
		}
	}

	function restoreFontFromCookie() {
		fontToRestore = Cookies.get('currentFont');
		currentFont    = currentFont = $(document.body).css('font-family');
		if ( currentFont == fontToRestore ) {
			if (DEBUG) {
				console.log('No need to restore font, cookie matches actual');
			}
			return;
		} else { 
			$(document.body).css('font-family', fontToRestore);
		}
	}
	function restoreFont() {
		originalFont = Cookies.get('originalFont');
		$(document.body).css('font-family', originalFont);
		Cookies.set( 'currentFont', originalFont);
	} 


	/*------------------------------------------------------------------
	|																	|
	|							Debug Routines			  				|
	|																	| 
	--------------------------------------------------------------------*/

	function displayButtonInformation(button) {
		console.log(`Button ${button.title} clicked`);
	}

})( jQuery );
