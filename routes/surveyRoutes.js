const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys/feedback', (req, res) => {
		res.send('Thanks for your feedback!');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const newSurvey = new survey({
			title,
			subject,
			body,
			// Making comma separated emails an array of strings and mapping them to an array of objetcs
			recipients: recipients
				.split(',')
				.map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});

		const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

		try {
			await mailer.send();
			await newSurvey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
