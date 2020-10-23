<?php
/**
 * Commonly used constants used throughout the plugin.
 *
 * @package scorpiotek-accessibility-plugin
 */

namespace ScorpioTek\WordPress\Accessibility;

class InfrastructureConstants {
	const PLUGIN_VERSION = '0.0.0.1';

	public static function get_plugin_version() {
		return self::PLUGIN_VERSION;
	}

	public static function get_scripts_directory() {
		return \dirname( __DIR__, 1 ) . '/dist/scripts/';
	}

	public static function get_scripts_directory_uri() {
		return \plugins_url( '/dist/scripts/', dirname( __FILE__ ) );
	}

	public static function get_fonts_directory_uri() {
		return \plugins_url( '/dist/fonts/', dirname( __FILE__ ) );
	}

	public static function get_stylesheet_directory_uri() {
		return \plugins_url( '/dist/css/', dirname( __FILE__ ) );
	}
}
