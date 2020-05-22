const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// For including the authentication strategy
require('./services/passport');

// Estabilishing MongoDB connection
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Initialising express app
const app = express();

// For handling authentication routes
require('./routes/authRoutes')(app);

// Listening on dynamic env port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
