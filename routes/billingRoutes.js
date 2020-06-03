const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
	app.post('/api/stripe', async (req, res) => {
		await stripe.charges.create({
			amount: 500,
			currency: 'inr',
			description: 'Pay $5 for 5 campaign credits!',
			source: req.body.id,
		});

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
