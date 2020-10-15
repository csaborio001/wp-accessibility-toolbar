<?php
/**
 * Loads the CSS and Javascript needed for the website, also hooks up the communication between
 * the PHP files and the Javascript files.
 *
 * @package scorpiotek-accessibility-plugin
 */

namespace ScorpioTek\WordPress\Accessibility;

class AccessibilityControls {
	public static function display_button_sizes() {
		echo '<button title="Reset Font" class="font-size-change" id="btn-orig" name="btn-orig">A</button>';
		echo '<button title="Increase Font" class="font-size-change" id="btn-increase" name="btn-increase">+A</button>';
	}
}