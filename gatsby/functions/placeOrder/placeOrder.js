const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
	return `<div>
		<h2>Your Recent Order for ${total}</h2>
		<p>Please start walking over, we will have your order ready in the next 20 mins.</p>
		<ul>
				${order.map(
					item => `<li>
					<img src="${item.thumbnail}" />	
					${item.size} ${item.name}
				</li>`
				)}
		</ul>
	</div>`;
}
const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 587,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

function wait(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, ms);
	});
}

exports.handler = async (event, context) => {
	const body = JSON.parse(event.body);
	const requiredFields = ['email', 'name', 'order'];

	for (const field of requiredFields) {
		if (!body[field]) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: `Oops, you forgot ${field}`
				})
			};
		}
	}

	const result = await transporter.sendMail({
		from: 'Slicks Slices <slick@example.com>',
		to: `${body.name} <${body.email}>`,
		subject: 'New order',
		html: generateOrderEmail({ order: body.order, total: body.total })
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Success' })
	};
};
