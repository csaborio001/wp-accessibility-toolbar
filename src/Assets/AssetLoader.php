<?php
/**
 * Loads the CSS and Javascript needed for the website, also hooks up the communication between
 * the PHP files and the Javascript files.
 *
 * @package scorpiotek-accessibility
 */

namespace ScorpioTek\Accessibility\Assets;

use ScorpioTek\Accessibility\Constants\InfrastructureConstants;

class AssetLoader {
	public static function load_front_end_assets() {
		self::load_plugin_scripts();
		self::load_plugin_stylesheets();
	}

	private static function load_plugin_scripts() {
		\wp_enqueue_script(
			'js.cookie',
			InfrastructureConstants::get_scripts_directory_uri() . '/js.cookie.min.js',
			array(),
			'2.2.0',
			true
		);
		\wp_enqueue_script(
			'font-size-accessibility',
			InfrastructureConstants::get_scripts_directory_uri() . '/fontsize.min.js',
			array( 'jquery' ),
			'0.0.1',
			true
		);
		\wp_enqueue_script(
			'scorpiotek-accessibility',
			InfrastructureConstants::get_scripts_directory_uri() . '/wp-accessibility-plugin.min.js',
			array( 'jquery' ),
			self::get_plugin_version(),
			true
		);

		\wp_localize_script(
			'scorpiotek-accessibility',
			'uriParameters',
			array(
				'font_uri' => InfrastructureConstants::get_fonts_directory_uri(),
				'css_uri'  => InfrastructureConstants::get_stylesheet_directory_uri(),
			)
		);
	}

	private static function load_plugin_stylesheets() {
		\wp_register_style(
			'accessibility-css',
			InfrastructureConstants::get_stylesheet_directory_uri() . '/wp-accessibility-plugin.css',
		);
		\wp_enqueue_style( 'accessibility-css' );
	}

	/**
	 * Returns the plugin version if found, otherwise returns a random number as fallback.
	 *
	 * @return mixed - the plugin version if it can be found, a random number between 1 and 1000 otherwise.
	 */
	private static function get_plugin_version() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugins = \get_plugins();
		if ( \is_array( $plugins ) && \array_key_exists( 'scorpiotek-accessibility/scorpiotek-accessibility.php', $plugins ) ) {
			if ( \array_key_exists( 'Version', $plugins['scorpiotek-accessibility/scorpiotek-accessibility.php'] ) ) {
				return $plugins['scorpiotek-accessibility/scorpiotek-accessibility.php']['Version'];
			} else {
				return wp_rand( 1, 1000 );
			}
		}
	}	
}
