/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import * as iconsModule from '@wordpress/icons';
const { Icon, ...icons } = iconsModule; // Extract the Icon component from the rest of the icons.

/**
 * Save function for the block.
 *
 * @param {Object} props            Props to be passed to the save function
 * @param {Object} props.attributes The block attributes as set by the user.
 *
 * @return {Element} Element to render.
 */
export default function Save( { attributes } ) {
	const { icon, textColor } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div>
				<Icon
					icon={ icons[ icon ] }
					size={ attributes.iconSize }
					style={ { fill: textColor } }
				/>
			</div>
			<InnerBlocks.Content />
		</div>
	);
}
