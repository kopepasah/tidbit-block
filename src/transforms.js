/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

export default {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			priority: 1,
			transform: ( attributes ) => {
				const paragraphAttributes = {
					content: attributes.content,
					textColor: attributes?.textColor || '',
					backgroundColor: attributes?.backgroundColor || '',
				};

				// Set a default style for the paragraph when no other styles are set.
				if ( ! attributes?.textColor && ! attributes?.backgroundColor ) {
					paragraphAttributes.style = {
						color: {
							text: '#ffffff',
							background: '#3858E9',
						},
					};
				}

				return createBlock( 'kopepasah/tidbit', {}, [
					createBlock( 'core/paragraph', paragraphAttributes ),
				] );
			},
		},
	],
};
