<?php
/**
 * Contains shortcodes used by Oxygen Templates to display content.
 * 
 * @package scorpiotek-accessibility
 *
 */

namespace ScorpioTek\Accessibility\Shortcodes;

use ScorpioTek\Accessibility\Controls\AccessibilityControls;

class PluginShortcodes {

	public static function initialize() {
		add_shortcode( 'add_st_accessibility_toolbar', array( self::class, 'add_st_accessibility_toolbar' ) );
	}

	public static function add_st_accessibility_toolbar() {
		AccessibilityControls::display_button_sizes();
	}
}
