if ( window.jQuery ) {
	jQuery( function($) {
		$( '#btn-orig' ).on( 'click' , (function(event){
			$( '#page' ).css( {"font-size": "100%"});
		}));
	});

	jQuery( function($) {
		$( '#btn-increase' ).on( 'click' , (function(event){
			var fontSize = parseInt($(' #page').css("font-size"));
			fontSize = fontSize + 5 + 'px';
			$( '#page' ).css( {"font-size": fontSize });
		}));
	});

	jQuery( function($) {
		$( '#btn-dis' ).on( 'click' , (function(event){
			var element = $('#page').children();
			console.log('cow');
			element.each(function (i) {
				$(this).css('font-family','opendyslexicregular');  
			});
		}))
	});
};