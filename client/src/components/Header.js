import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

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
			return [
				<li key="1" style={{ marginRight: '10px' }}>
					Credits: {this.props.auth.credits}
				</li>,
				<li key="2" style={{ margin: '0 10px' }}>
					<Payments />
				</li>,
				<li key="3" style={{ marginRight: '10px' }}>
					<a href="/api/logout">Logout</a>
				</li>,
			];
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo"
						style={{ marginLeft: '15px' }}
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
