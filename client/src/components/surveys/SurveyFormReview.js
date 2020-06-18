import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

function SurveyFormReview({ onCancel, formValues, sendSurvey, history }) {
	const reviewFields = formFields.map(({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 btn-flat left white-text"
				onClick={onCancel}
			>
				<i className="material-icons right">undo</i>
				Back
			</button>
			<button
				className="green btn-flat right white-text"
				onClick={() => sendSurvey(formValues, history)}
			>
				<i className="material-icons right">send</i>
				Send
			</button>
		</div>
	);
}

function mapStateToProps(state) {
	// console.log(state);
	return {
		formValues: state.form.surveyForm.values,
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
