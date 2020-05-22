const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			//Internal identifier in Google Strategy
			scope: ['profile', 'email'],
		})
	);

	// Callback will have the code
	app.get('/auth/google/callback', passport.authenticate('google'));
};
