const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

function sendEmail(subject, contentHeading, content, destinationEmails) {
    const params = {
        Destination: {
            ToAddresses: destinationEmails
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <html>
                            <head>
                                <style>
                                    .main-div{
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    }

                                    .content-div{
                                        background-image: linear-gradient(to right, #f7bf59, #f9b552, #fbab4c, #fda048, #ff9545);
                                        padding: 15px;
                                        width: 30%;
                                        border-radius: 20px;
                                    }

                                    h3{
                                        text-align: center;
                                    }

                                    p{
                                        text-align: center;
                                        line-height: 24px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="main-div">
                                    <div class="content-div">
                                        <h3>${contentHeading}</h3>
                                        <p>${content}</p>
                                    </div>
                                </div>
                            </body>
                        </html>`
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Hello from AWS SES"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject
            }
        },
        Source: "omtekade914@gmail.com"
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            console.log("Error sending email", err);
        } else {
            console.log("Emails sent successfully.", data);
        }
    });
}

module.exports = sendEmail;