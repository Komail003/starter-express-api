const Express = require("express");
const MyRouter = Express.Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'usamafaheem80@gmail.com',
        pass: 'fmxf zrmd vcgk cagf'
    },
    tls: {
        rejectUnauthorized: false
    }
});


// HTML email template
const generateHtmlTemplate = (myObj) =>`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #4CAF50;
      border-radius: 5px;
    }
    h1 {
      color: #4CAF50;
    }
    p {
      color: #555;
    }
    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: #fff;
      text-decoration: none;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Adviser Link Subscription is Expiring Soon!</h1>
    <p>Hello ${myObj.name},</p>
    <p>We hope you've been enjoying our service. We wanted to inform you that your subscription is expiring in ${myObj.days} days. To continue enjoying uninterrupted access to our amazing tools, please renew your subscription at your earliest convenience.</p>
    <p>Renew now by clicking the button below:</p>
    <a href="[Renewal Link]" class="cta-button">Renew Subscription</a>
    <p>If you have any questions or need assistance, feel free to contact our support team at abc@gmail.com.</p>
    <p>Thank you for choosing us!</p>
  </div>
</body>
</html>

`;

// Email content

MyRouter.post("/", async (req, res) => {
    const myObj=req.body;
    const userEmail=req.body.email;
    const toEmails = ['usamafaheemahmed80@gmail.com', 'usamasaeed3k@gmail.com', 'fahadg5015@gmail.com','nat@denarolink.com.au'];
    // const toEmails = ['usamasaeed3k@gmail.com'];



    const mailOptions = {
        from: 'usamafaheem80@gmail.com',
        to: userEmail,
        // to: toEmails.join(','),

        bcc:toEmails.join(','),
        subject: 'Adviser Link Subscription',
        html: generateHtmlTemplate(myObj) // Include the HTML content here
      };
    try {
        // Send email
        // console.log('Email sent:');

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.send("Email sent");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error sending email");
    }
});


module.exports = MyRouter;
