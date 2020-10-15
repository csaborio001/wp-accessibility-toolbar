<?php
/**
 * Contains shortcodes used by Oxygen Templates to display content.
 * 
 * @package scorpiotek-accessibility-plugin
 * 
 * @since 0.0.0.1
 */

namespace ScorpioTek\WordPress\Accessibility;

use ScorpioTek\WordPress\Accessibility\AccessibilityControls;

class OxyShortCodes {

	public function __construct() {
		add_shortcode( 'add_st_accessibility_toolbar', array( $this, 'add_st_accessibility_toolbar' ) );
	}

	public function add_st_accessibility_toolbar() {
		global $post;
		/** Do stuff */
		// echo '<h1>Hello Cow</h1>';
		// wp_reset_postdata();
		AccessibilityControls::display_button_sizes();
	}
}
