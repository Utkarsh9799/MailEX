const express = require('express');
require('./services/passport');

// Initialising express app
const app = express();

require('./routes/authRoutes')(app);

// Listening on dynamic env port or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
