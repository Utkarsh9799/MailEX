const express = require('express');
const mongoose = require('mongoose');

//For accessing cookies for authentication
const cookieSession = require('cookie-session');
const passport = require('passport');

//For MongoURI and encrypting cookies in cookieSession
const keys = require('./config/keys');

// For user model class in MongoDB
require('./models/user');

// For including the authentication strategy
require('./services/passport');

// Estabilishing MongoDB connection
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Initialising express app
const app = express();

//Enabling cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());

app.use(passport.session());

// For handling authentication routes
require('./routes/authRoutes')(app);

// Listening on dynamic env port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
