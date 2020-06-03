import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="MailEX"
				description="Pay $5 for 5 survey credits!"
				amount={500} // In cents USD
				token={(token) => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<a>Add Credits</a>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
