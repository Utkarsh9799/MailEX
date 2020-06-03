const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
	app.post('/api/stripe', (req, res) => {
		stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: 'Pay $5 for 5 campaign credits!',
			source: req.body.id,
		});
	});
};
