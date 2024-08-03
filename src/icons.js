/**
 * WordPress dependencies
 */
import * as iconsModule from '@wordpress/icons';
const { Icon, ...icons } = iconsModule;

const topIcons = [
	'starFilled',
	'starHalf',
	'starEmpty',
	'info',
	'notAllowed',
	'plusCircleFilled',
	'helpFilled',
	'warning',
	'cancelCircleFilled',
	'quote',
	'plusCircle',
	'help',
	'published',
	'check',
	'lifesaver',
];

const otherIcons = Object.keys( icons ).filter( ( icon ) => ! topIcons.includes( icon ) );

export { otherIcons };
export default topIcons;
