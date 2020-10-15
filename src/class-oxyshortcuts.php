<?php
/**
 * Contains shortcodes used by Oxygen Templates to display content.
 * 
 * @package scorpiotek-accessibility-plugin
 * 
 * @since 0.0.0.1
 */

namespace ScorpioTek\WordPress\Accessibility;

class OxyShortCodes {

	public function __construct() {
		add_shortcode( 'add_sp_toolbar', array( $this, 'add_sp_toolbar' ) );

	}

	public function add_sp_toolbar() {
		global $post;
		/** Do stuff */

		wp_reset_postdata();
	}
}
