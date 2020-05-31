const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			//Internal identifier in Google Strategy
			scope: ['profile', 'email'],
		})
	);

	// Callback will have the code returned by google server
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	// Handling logout
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	// Responding after authentication
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
