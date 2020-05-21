const express = require('express');

// Initialising express app
const app = express();

// Handling routes
app.get('/', (req, res) => {
	res.send('Hello!');
});

// Listening on dynamic env port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
