import React from 'react';
import './button.css';

/*array of differnt styles/colors you can apply to the button you could use this for certain situations to change the color with javascript
the first four are the inside of the boxes color, and the last four affect the outline of the boxes*/
const STYLES = [
	'btn--white--outline',
	'btn--primary--solid',
	'btn--warning--solid',
	'btn--danger--solid',
	'btn--success--solid',
	'btn--primary--outline',
	'btn--warning--outline',
	'btn--danger--outline',
	'btn--success--outline'
];

/*array for different sizes of the button, can change all of htis in button.css*/

const SIZES = [ 'btn--medium', 'btn--small' ];

const POSITIONS = [ 'adjustdown', 'adjustright' ];

const FLEX = [ 'buttons' ];

/*the actual button component call, just has some checks to make sure the size and color is fine, otherwise sets to a default. returns the button
note for tomorrow might be able to set buttonlocation in the return here*/
export const myButton = ({ children, type, onClick, buttonStyle, buttonSize, buttonLocation }) => {
	const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

	const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

	const checkButtonLocation = POSITIONS.includes(buttonLocation) ? buttonLocation : POSITIONS[0];

	return (
		<div>
			<button
				className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonLocation}`}
				onClick={onClick}
				type={type}
			>
				{children}
			</button>
		</div>
	);
};