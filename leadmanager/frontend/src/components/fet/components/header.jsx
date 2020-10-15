import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './header.css';
import wsu from './wsu.jpg';

class Header extends Component {
	render() {
		return (
			<header className="header">
				<div>
					<img alt="wichita" className="fiximage" src={wsu} />
					<div className="fixtext">Wichita State Fire Department</div>
				</div>
			</header>
		);
	}
}

export default Header;
