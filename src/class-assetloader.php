<?php
/**
 * Loads the CSS and Javascript needed for the website, also hooks up the communication between
 * the PHP files and the Javascript files.
 *
 * @package scorpiotek-accessibility-plugin
 */

namespace ScorpioTek\WordPress\Accessibility;

class AssetLoader {
	public function __construct() {

	}

	public function hook_wp_admin_assets() {
		add_action( 'admin_enqueue_scripts', array( $this, 'load_admin_assets') );
	}

	public function hook_front_end_assets() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_front_end_assets' ) );
	}

	public function load_admin_assets() {
		wp_register_style(
			'admin_styles',
			\plugins_url( '/dist/css/st-admin-styles.css',
			dirname( __FILE__ ) ),
			false,
			'1.0.0.'
		);
		wp_enqueue_style( 'admin_styles' );
	}

	public function load_front_end_assets() {
			$this->load_plugin_scripts();
			$this->load_plugin_stylesheets();
	}

	public function load_plugin_scripts() {
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
			InfrastructureConstants::get_plugin_version(),
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

	public function load_plugin_stylesheets() {
		\wp_register_style(
			'accessibility-css',
			InfrastructureConstants::get_stylesheet_directory_uri() . '/wp-accessibility-plugin.css',
		);
		\wp_enqueue_style( 'accessibility-css' );
	}
}
