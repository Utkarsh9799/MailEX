const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Loading the users model in user object of model class
const user = mongoose.model('users');

// Serialising user by providing them token and storing it in cookies for identification of user for follow up requests
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialising the user by getting the id from cookie and returning the user
passport.deserializeUser((id, done) => {
	user.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await user.findOne({ googleID: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			}

			const createdUser = await new user({ googleID: profile.id }).save();
			done(null, createdUser);
		}
	)
);
