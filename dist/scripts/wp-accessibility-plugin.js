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
	// verifyCookieHasValidValues();
	restoreFontSizeFromCookie();
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
	|							Cookie Routines			  				|
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

	function verifyCookieHasValidValues() {
		cookieTextButtonClicked = parseInt(Cookies.get('textButtonClicked'));
		if (isNaN(cookieTextButtonClicked)) {return 0;}
		if ( cookieTextButtonClicked > MAX_ZOOM || cookieTextButtonClicked < MIN_ZOOM ) {
			Cookies.set( 'textButtonClicked', 0);
			textButtonClicked = 0;
		}
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
