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
		const p = new Path('/api/surveys/:surveyId/:choice');

		const events = _.chain(req.body)
			.filter(({ event }) => event === 'click') // Checking for click events
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname); // Extracting data from url

				if (match) {
					return { email, ...match }; // Removing undefined and falsey values from array
				}
			})
			.uniqWith(
				(a, b) => a.email === b.email && a.surveyId === b.surveyId // Removing duplicates with same email on same survey
			)
			.each(({ surveyId, email, choice }) => {
				survey
					.updateOne(
						{
							_id: surveyId,
							recipients: {
								$elemMatch: { email: email, responded: false },
							},
						},
						{
							$inc: { [choice]: 1 },
							$set: { 'recipients.$.responded': true },
						}
					)
					.exec();
			})
			.value(); // To pull the array out

		// console.log('uniqueResponses:\n', events);

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
