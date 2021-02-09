<?php
/**
 * Hooks most of the actions and filters in the system.
 *
 * @package scorpiotek-accessibility
 */

namespace ScorpioTek\Accessibility\Hooks;

use ScorpioTek\Accessibility\Assets\AssetLoader;
use ScorpioTek\Accessibility\Hooks\ActionFilterRegistration;
use ScorpioTek\Accessibility\Shortcodes\PluginShortcodes;

class FrontEndHooker {

	public function __construct() {
		$action_filter_register = new ActionFilterRegistration();
		$action_filter_register->add_action( 'wp_enqueue_scripts', AssetLoader::class, 'load_front_end_assets' );
		$action_filter_register->add_action( 'init', PluginShortcodes::class, 'initialize' );
		if ( ! empty( $action_filter_register ) ) {
			$action_filter_register->run();
		}
	}
}

