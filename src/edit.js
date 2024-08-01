/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, Button, RangeControl, Flex } from '@wordpress/components';
import { useState, useEffect, Fragment } from '@wordpress/element';
import * as iconsModule from '@wordpress/icons';
const { Icon, ...icons } = iconsModule; // Extract the Icon component from the rest of the icons.

/**
 * Internal dependencies
 */
import topIcons, { otherIcons } from './icons';

/**
 * The icon button component.
 *
 * @param {Object}   props          The component properties.
 * @param {string}   props.icon     The icon to render.
 * @param {boolean}  props.isActive Whether the icon is active.
 * @param {Function} props.onClick  The function to call when the icon is clicked.
 *
 * @return {Element} The element to render.
 */
const IconButton = ( { icon, isActive, onClick } ) => {
	return (
		<Button
			style={ {
				width: '48px',
				height: '48px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '0',
				flexBasis: '20%',
			} }
			variant={ isActive ? 'primary' : 'tertiary' }
			onClick={ onClick }
		>
			<Icon icon={ icon } size="32" />
		</Button>
	);
};

/**
 * Edit function for the block.
 *
 * @param {Object}   props               The properties of the block.
 * @param {Object}   props.attributes    The attributes of the block.
 * @param {Function} props.setAttributes The function to set the attributes of the block.
 * @param {string}   props.clientId      The client ID of the block.
 *
 * @return {Element} The element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const [ showIcons, setShowIcons ] = useState( false );

	const paragraphBlock = useSelect(
		( select ) => {
			// @todo Select colors from the settings and apply colors accessibly.
			return select( 'core/block-editor' )
				.getBlock( clientId )
				.innerBlocks.find( ( b ) => b.name === 'core/paragraph' );
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( paragraphBlock ) {
			const textColor =
				paragraphBlock?.attributes?.textColor ||
				paragraphBlock?.attributes?.style?.color?.text ||
				'';

			setAttributes( { textColor } );
		}
	}, [ paragraphBlock, setAttributes ] );

	const iconFill =
		( ! attributes.textColor && 'inherit' ) ||
		( /^#/.test( attributes.textColor ) && attributes.textColor ) ||
		`var(--wp--preset--color--${ attributes.textColor })`;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Icon', 'tidbit' ) }>
					<RangeControl
						value={ attributes.iconSize }
						onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
						min={ 12 }
						max={ 64 }
					/>

					<Flex wrap={ true } gap={ 0 }>
						{ topIcons.map( ( key ) => <IconButton key={ key } icon={ icons[ key ] } isActive={ attributes.icon === key } onClick={ () => setAttributes( { icon: key } ) } /> ) }
					</Flex>

					<Button
						style={ {
							display: 'block',
							width: '100%',
							marginTop: '1em',
							marginBottom: '1em',
						} }
						variant={ 'tertiary' }
						onClick={ () => setShowIcons( ! showIcons ) }
					>{ showIcons ? __( 'Hide Other Icons', 'tidbit' ) : __( 'Show Other Icons', 'tidbit' ) }</Button>

					{ showIcons && (
						<Flex wrap={ true } gap={ 0 }>
							{ otherIcons.map( ( key ) => <IconButton key={ key } icon={ icons[ key ] } isActive={ attributes.icon === key } onClick={ () => setAttributes( { icon: key } ) } /> ) }
						</Flex>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'wp-block-tidbit' } ) }>
				<div>
					<Icon
						icon={ icons[ attributes.icon ] }
						size={ attributes.iconSize }
						style={ { fill: iconFill } }
					/>
				</div>
				<InnerBlocks
					template={ [
						[
							'core/paragraph',
							{
								placeholder: __( 'Write tidbit…', 'tidbit' ),
								style: {
									color: {
										text: '#ffffff',
										background: '#3858E9',
									},
								},
							},
						],
					] }
					templateLock="all"
				/>
			</div>
		</Fragment>
	);
}
