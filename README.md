# SES QuickMailer

SES Mailer is a Node.js application that allows users to send mass emails using Amazon SES (Simple Email Service). It provides a simple interface to upload a CSV file containing email addresses, verify those emails with AWS SES, and send emails to the verified recipients.

## Setup

### Requirements
- Node.js installed on your machine
- An AWS account with SES service enabled
- Access Key ID and Secret Access Key for AWS SES
- A CSV file containing email addresses

### Installation
1. Clone the repository:
```bash
git clone https://github.com/NegativE333/ses-quick-mailer.git
cd ses-quick-mailer
```

2. Install dependencies:
```bash
npm install
```

### Configuration:
- Create a .env file in the root directory of the project.
- Add the following environment variables to the .env file:
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
```
- Replace your_aws_access_key_id, your_aws_secret_access_key and your_aws_region with your actual AWS credentials.

### Usage:
1. Start the server:
```bash
npm run dev
```
- This command will start the server using `nodemon`, which automatically restarts the server when changes are detected in your code.

2. Compile Tailwind CSS:
```bash
npm run style
```
- This command watches the `input.css` file in the `public/css` directory and compiles it into `output.css` using Tailwind CSS. Make sure to link the `output.css` file in your HTML templates to apply Tailwind CSS styles.

3. Access the application in your browser at `http://localhost:8000`.

4. Upload the CSV file, provide the email subject and content, and click send.

### Important Notes:
- Make sure your AWS SES service is correctly configured and verified to avoid any issues with email sending.
- Ensure that the CSV file contains email addresses in a single column without any headers.

### Screenshots
- Home page
![image](https://github.com/NegativE333/ses-quick-mailer/assets/102456428/b907f9fb-b564-4aa1-b792-dca0e093d0e1)

- Result page
![image](https://github.com/NegativE333/ses-quick-mailer/assets/102456428/4170e00a-2f6e-4e14-a494-68465b96a001)
