import React, { Component } from 'react';
// Importing redux form helper to communicate with redux store and field component for rendering html tags
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

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

					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

// Adding props to the class component
export default reduxForm({
	form: 'surveyForm',
})(SurveyForm);
