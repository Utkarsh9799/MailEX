import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

function SurveyFormReview({ onCancel, formValues, sendSurvey, history }) {
	const reviewFields = formFields.map(({ name, label }) => {
		return (
			<div style={{ padding: '2%' }}>
				<div key={name} style={{ margin: '0 10px' }}>
					<label
						style={{
							color: 'black',
							fontSize: '20px',
							fontWeight: '600',
						}}
					>
						{label}
					</label>
					<div>{formValues[name]}</div>
				</div>
			</div>
		);
	});

	return (
		<div>
			<h5 style={{ marginBottom: '3%', marginTop: '3%' }}>
				Please confirm your entries
			</h5>
			<div style={{ border: '1px solid black' }}>{reviewFields}</div>

			<div style={{ marginTop: '5%' }}>
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
