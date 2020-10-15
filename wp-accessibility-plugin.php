<?php
/**
 * @package scorpiotek-accessibility-plugin
 *
 * @version 0.0.0.1
 */
/*
Plugin Name: ScorpioTek Accessibility Plugin
Plugin URI: https://github.com/csaborio001/wp-accessibility-toolbar.git
Description: Enables the use of an accessibility toolbar for any WordPress website.
Author: ScorpioTek
Version: 0.0.0.1
Author URI: https://www.scorpiotek.com
*/

namespace ScorpioTek\WordPress\Accessibility;

/** Exit if file is called directly. */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once 'vendor/autoload.php';

use ScorpioTek\WordPress\Accessibility\WPHooker;
use ScorpioTek\WordPress\Accessibility\AssetLoader;
use ScorpioTek\WordPress\Accessibility\OxyShortCodes;

class WPInfrastructure {
	public function __construct() {
		add_action(
			'after_setup_theme',
			array( $this, 'initialize_components' )
		);
	}

	public function initialize_components() {
		/** Setup all the hooks used by the website. */
		if ( class_exists( WPHooker::class ) ) {
			$wp_hooker = new WPHooker();
			if ( is_admin() ) {
				$wp_hooker->setup_admin_hooks();
			} else {
				$wp_hooker->setup_front_end_hooks();
			}
		} else {
			if ( WP_DEBUG ) {
				error_log( __( 'INFRASTRUCTURE ERROR: Class WPHooker could not be found.', 'scorpiotek' ) );
			}
		}

		/** Setup Asset Loading (scripts and CSS) */
		if ( class_exists( AssetLoader::class ) ) {
			if ( is_admin() ) {
				$asset_loader = new AssetLoader();
				$asset_loader->hook_wp_admin_assets();
			} else {
				$asset_loader = new AssetLoader();
				$asset_loader->hook_front_end_assets();
			}
		} else {
			if ( WP_DEBUG ) {
				error_log( __( 'INFRASTRUCTURE ERROR: Class AssetLoader could not be found.', 'scorpiotek' ) );
			}
		}

		/** Load all the Short Codes used in this project. */
		if ( class_exists( OxyShortCodes::class ) ) {
			$oxy_short_codes_loader = new OxyShortCodes();
		} else {
			if ( WP_DEBUG ) {
				error_log( __( 'INFRASTRUCTURE ERROR: Class OxyShortCodes could not be found.', 'scorpiotek' ) );
			}
		}		
	}
}

$class_infrastructure = new WPInfrastructure();

