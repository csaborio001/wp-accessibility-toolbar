<?php
/**
 * Hooks most of the actions and filters in the system.
 *
 * @package scorpiotek-accessibility-plugin
 */

namespace ScorpioTek\WordPress\Accessibility;

use WPMuDev\ActionFilterRegistration;

class WPHooker {
	public function setup_admin_hooks() {
		$action_filter_register = new ActionFilterRegistration();
		/** Define Hook Functions Here
		 * $this->setup_acf_admin_hooks( $action_filter_register );
		 * $this->setup_post_save_admin_hooks( $action_filter_register );
		 * $this->setup_admin_tweaks_admin_hooks( $action_filter_register );
		 * $this->setup_user_management_admin_hooks( $action_filter_register );
		 * $this->setup_access_management_admin_hooks( $action_filter_register );
		 * $this->setup_gravity_forms_admin_hooks( $action_filter_register );
		 * $this->setup_ajax_admin_hooks( $action_filter_register );
		 */
		if ( ! empty( $action_filter_register ) ) {
			$action_filter_register->run();
		}
	}

	public function setup_front_end_hooks() {
		$action_filter_register = new ActionFilterRegistration();
		/** Define Hook Functions Here
		 * $this->setup_query_modifications_front_end_hooks( $action_filter_register );
		 * $this->setup_user_management_front_end_hooks( $action_filter_register );
		 * $this->setup_login_front_end_hooks( $action_filter_register );
		 * $this->setup_registration_front_end_hooks( $action_filter_register );
		 * $this->setup_profile_front_end_hooks( $action_filter_register );
		 */
		if ( ! empty( $action_filter_register ) ) {
			$action_filter_register->run();
		}
	}
}

