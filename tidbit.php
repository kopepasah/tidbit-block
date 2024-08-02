<?php
/**
 * Plugin Name:       Tidbit Block
 * Description:       A small and particularly interesting piece of information, news, or gossip.
 * Requires at least: 6.2
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Justin Kopepasah
 * Author URI:        https://kopepasah.com/
 * License:           MPL-2.0
 * License URI:       https://www.mozilla.org/en-US/MPL/2.0/
 * Text Domain:       tidbit
 *
 * @package Tidbit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build' );
	}
);
