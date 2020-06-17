import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Importing redux form helper to communicate with redux store and field component for rendering html tags
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const Fields = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipients List', name: 'emails' },
];

class SurveyForm extends Component {
	renderFields() {
		return Fields.map(({ name, label }) => {
			return (
				<Field
					key={name}
					type="text"
					component={SurveyField}
					name={name}
					label={label}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit((values) =>
						console.log(values)
					)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						<i className="material-icons right">cancel</i>Cancel
					</Link>
					<button
						className="teal btn-flat right white-text"
						type="submit"
					>
						<i className="material-icons right">done</i>
						Next
					</button>
				</form>
			</div>
		);
	}
}

const validateForm = (values) => {
	const errors = {};

	errors.emails = validateEmails(values.emails || '');

	Fields.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = 'This field can not be empty!';
		}
	});

	return errors;
};

// Adding props to the class component
export default reduxForm({
	form: 'surveyForm',
	validate: validateForm,
})(SurveyForm);
