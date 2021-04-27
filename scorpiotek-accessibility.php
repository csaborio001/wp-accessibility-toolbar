<?php
/*
Plugin Name: ScorpioTek Accessibility
Plugin URI: https://github.com/csaborio001/wp-accessibility-toolbar.git
Description: Enables the use of an accessibility toolbar for any WordPress website.
Author: ScorpioTek
Version: 0.0.0.3
Author URI: https://www.scorpiotek.com
*/

/** Exit if file is called directly. */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once 'vendor/autoload.php';

use ScorpioTek\Accessibility\Hooks\FrontEndHooker;

class ScorpioTekAccessibility {
	public function __construct() {
		if ( class_exists( FrontEndHooker::class ) ) {
			$this->initialize_components();
		} else {
			if ( WP_DEBUG ) {
				error_log( 'ScorpioTek Accessibility: One of the hooker classes could not be loaded, exiting.' );
				return;
			}
		}
	}

	public function initialize_components() {

		/** Loads the hooks that are only needed in the back end. */
		if ( is_admin() ) {
			// $wp_hooker->setup_admin_hooks();
		/** Load the hooks that are only needed in the front end. */
		} else {
			$front_end_hooker = new FrontEndHooker();
		}
	}
}

$scorpiotek_accessibility = new ScorpioTekAccessibility();

