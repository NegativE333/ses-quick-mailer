const fs = require("fs");
const readline = require("readline");

function readEmailsFromFile(filePath, callback) {
    const emails = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        // Assuming each line contains one email address
        emails.push(line.trim()); // Trim whitespace
    });

    rl.on('close', () => {
        callback(emails);
    });
}

module.exports = readEmailsFromFile;