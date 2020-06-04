const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// Relationship field setting up relationship with user model
	_user: { type: Schema.Types.ObjectId, ref: 'user' },
	dateSent: Date,
	lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
