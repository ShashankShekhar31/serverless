const AWS = require('aws-sdk');

module.exports.sendEmail = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No data provided" }),
      };
    }

    const { receiver_email, subject, body_text } = JSON.parse(event.body);

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const params = {
      Destination: {
        ToAddresses: [receiver_email],
      },
      Message: {
        Body: {
          Text: { Data: body_text },
        },
        Subject: { Data: subject },
      },
      Source: "shashank.shekhar0331@gmail.com", 
    };

    const ses = new AWS.SES({ region: 'us-west-1' }); 
    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
