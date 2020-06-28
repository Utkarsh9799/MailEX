import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing redux form helper to communicate with redux store and field component for rendering html tags
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderformFields() {
		return formFields.map(({ name, label }) => {
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
					style={{ marginTop: '3%' }}
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					<fieldset style={{ padding: '5%' }}>
						<legend>Survey Form</legend>
						{this.renderformFields()}
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
					</fieldset>
				</form>
			</div>
		);
	}
}

const validateForm = (values) => {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	formFields.forEach(({ name }) => {
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
	destroyOnUnmount: false, // To persist survey data
})(SurveyForm);
