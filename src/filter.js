/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { cloneElement } from '@wordpress/element';

/*
 * Internal dependencies
 */
import block from './block.json';

/**
 * Filters the save element props.
 *
 * @param {Element} element   The save element.
 * @param {Object}  blockType The block type.
 *
 * @return {Element} The element to render.
 */
addFilter(
	'blocks.getSaveElement',
	`${ block.name }/save-class`,
	( element, blockType ) => {
		if ( blockType?.name === block?.name && element?.props?.className ) {
			return cloneElement( element, {
				className: element?.props?.className.replace( block.name.replace( '/', '-' ), 'tidbit' ) || 'tidbit',
			} );
		}

		return element;
	}
);
