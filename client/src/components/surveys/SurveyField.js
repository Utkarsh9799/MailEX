import React from 'react';

export default ({ input, label, meta: { error, touched, active } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '1%' }} />
			<div className="red-text" style={{ marginBottom: '2%' }}>
				{!active && touched && error}
			</div>
		</div>
	);
};
