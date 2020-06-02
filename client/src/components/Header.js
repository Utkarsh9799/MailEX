import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderContent() {
		if (this.props.auth === null) {
			return;
		} else if (this.props.auth === false) {
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
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo"
					>
						MailEX
					</Link>
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
