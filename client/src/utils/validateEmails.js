// Regular expression for email
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
	const invalidEmails = emails
		.split(',')
		.map((email) => email.trim())
		// Filtering and removing the valid emails and keeping the invalid ones
		.filter((email) => email.length && re.test(email) === false);

	if (invalidEmails.length) {
		return `The following emails are invalid: ${invalidEmails}`;
	}

	return;
};
