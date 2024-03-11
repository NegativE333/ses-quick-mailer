const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion : "2010-12-10" });

function checkVerificationStatus(emails, callback) {
    const verifiedEmails = [];
    const unverifiedEmails = [];

    let count = 0;

    const checkEmailVerification = (email) => {
        const params = {
            Identities: [email]
        };

        ses.getIdentityVerificationAttributes(params, (err, data) => {
            count++;

            if (err) {
                console.log(`Error checking verification status for ${email}`, err);
                unverifiedEmails.push(email);
            } else {
                const verificationAttributes = data.VerificationAttributes;
                if (verificationAttributes && verificationAttributes[email] && verificationAttributes[email].VerificationStatus === "Success") {
                    console.log(`${email} is verified`);
                    verifiedEmails.push(email);
                } else {
                    console.log(`${email} is not verified`);
                    unverifiedEmails.push(email);
                    
                    const verifyParams = {
                        EmailAddress: email
                    };

                    ses.verifyEmailAddress(verifyParams, (err, data) => {
                        if (err) {
                            console.log(`Error verifying ${email}`, err);
                        } else {
                            console.log(`Verification email sent to ${email} : `, data);
                        }
                    });
                }
            }

            if (count === emails.length) {
                callback(null, verifiedEmails, unverifiedEmails);
            }
        });
    };

    emails.forEach(email => {
        checkEmailVerification(email);
    });
}

module.exports = checkVerificationStatus;