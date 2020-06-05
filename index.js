const express = require('express');
const mongoose = require('mongoose');

//For accessing cookies for authentication
const cookieSession = require('cookie-session');
const passport = require('passport');

//For MongoURI and encrypting cookies in cookieSession
const keys = require('./config/keys');

// For user model class in MongoDB
require('./models/user');

// For survet model class in MongoDB
require('./models/survey');

// For including the authentication strategy
require('./services/passport');

// Estabilishing MongoDB connection
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Initialising express app
const app = express();

// Express body parser
app.use(express.json());

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

// For handling billing
require('./routes/billingRoutes')(app);

// For handling survey routes
require('./routes/surveyRoutes')(app);

// Routing logic for production environment
if (process.env.NODE_ENV === 'production') {
	// Serving production assests (production build of CRA)
	app.use(express.static('client/build'));

	// Serving index.html if route not recognised by express server
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Listening on dynamic env port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
