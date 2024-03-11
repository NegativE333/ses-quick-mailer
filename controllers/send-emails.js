const sendEmail = require("../helper/sendmails");
const checkVerificationStatus = require('../helper/verify');
const readEmailsFromFile = require("../helper/csv");

async function handleSendEmail(req, res) {
    const body = req.body;

    console.log(req.file.originalname);

    let verifiedEmailsArr = [];
    let unverifiedEmailsArr = [];

    readEmailsFromFile(`D:/Cloud/cp/uploads/${req.file.originalname}`, (emails) => {

        checkVerificationStatus(emails, (err, verifiedEmails, unverifiedEmails) => {
            if (err) {
                console.error("Error occurred while checking verification status:", err);
                return;
            }

            if (verifiedEmails.length > 0) {
                sendEmail(body.subject, body.title, body.content, verifiedEmails);
                verifiedEmailsArr = verifiedEmails;
            } else {
                console.log("No emails are verified.");
            }

            if (unverifiedEmails.length > 0) {
                console.log("Unverified emails:", unverifiedEmails);
                unverifiedEmailsArr = unverifiedEmails;
            } else {
                console.log("All emails are verified.");
            }

            res.render("result", {
                verifiedEmails: verifiedEmailsArr,
                unverifiedEmails: unverifiedEmailsArr
            });
        });
    });
}

module.exports = {
    handleSendEmail
}