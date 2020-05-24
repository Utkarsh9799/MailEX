const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Loading the users model in user object of model class
const user = mongoose.model('users');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			user.findOne({ googleID: profile.id }).then((userExists) => {
				if (userExists) {
					// Don't create a new record
				} else {
					// Create a new record
					new user({ googleID: profile.id }).save();
				}
			});
		}
	)
);
