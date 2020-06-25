const mongoose = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');
const _ = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const survey = mongoose.model('surveys');

module.exports = (app) => {
	app.get('/api/surveys/feedback', (req, res) => {
		res.send('Thanks for your feedback!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const events = req.body.map(({ email, url }) => {
			const pathname = new URL(url).pathname;
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname);
			if (match) {
				return { email, ...match };
			}
		});

		const compactEvents = _.compact(events); // Removing falsey values or undefined events
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
		console.log(uniqueEvents);
		res.send({});
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
