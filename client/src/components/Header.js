import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
	renderContent() {
		if (this.props.auth == null) {
			return;
		} else if (this.props.auth == false) {
			return (
				<li>
					<a href="/auth/google">Login With Google</a>
				</li>
			);
		} else {
			return (
				<li>
					<a href="/api/logout">Logout</a>
				</li>
			);
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo">
						MailEX
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
