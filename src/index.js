/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Styles
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Block filters
 */
import './filter';

/**
 * Register block
 */
registerBlockType( metadata.name, { edit, save } );
