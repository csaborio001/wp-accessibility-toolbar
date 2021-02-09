<?php
/**
 * Loads the CSS and Javascript needed for the website, also hooks up the communication between
 * the PHP files and the Javascript files.
 *
 * @package scorpiotek-accessibility
 */

namespace ScorpioTek\Accessibility\Controls;

class AccessibilityControls {
	public static function display_button_sizes() {
	?>
		<div id="wp-accessibility">
			<button title="Reset Font" class="font-size-change" id="btn-reset" name="btn-reset">A</button>
			<button title="Decrease Font Size" class="font-size-change" id="btn-decrease" name="btn-decrease">-A</button>
			<button title="Increase Font Size" class="font-size-change" id="btn-increase" name="btn-increase">+A</button>
			<button title="Toggle Dyslexic Font" class="font-size-change" id="btn-dyslexic" name="btn-dyslexic">D</button>
			<button title="Toggle High Contrast Mode" class="font-size-change" id="btn-contrast" name="btn-contrast">O</button>
		</div>
	<?php
	}
}
