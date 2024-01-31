const Express = require("express");
const MyRouter = Express.Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'admin@denarolink.com.au',
        pass: '&6LjfQ##InXHkM&s'
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
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .title {
      color: #4CAF50;
      /* padding-bottom: 1px; */
      margin: 0px;
    }
    .company_name {
      text-align: center;
      color: #4CAF50;
      padding-bottom: 1px;
      margin: 0px;

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
    <h1 class="company_name">Adviser Link</h1>

    <h2 class="title">Client Assignment!</h2>
    <p>Hello Admin,</p>
    <p>I hope this message finds you well. I am pleased to inform you that a client
    <strong>${myObj.UserName}</strong>, has been assigned to you. The client is in need of your expertise and assistance.</p>
    <p>Please reach out to <strong>${myObj.UserName}</strong> at your earliest convenience to introduce yourself and initiate the onboarding process. Here are the client's details:</p>
   
    <ul>
      <li><strong>Name:</strong> ${myObj.UserName}</li>
      <li><strong>Contact Information:</strong> ${myObj.UserEmail}</li>
      
    </ul>
    <!-- <p>If you have any questions or need additional information, please do not hesitate to contact me at abc@gmail.com.</p>
    <p>Thank you for your dedication and commitment to our clients!</p> -->
  
  </div>
</body>
</html>

`;

// Email content


async function assignToMailFun(  foundUser) {
    const myObj=foundUser;
        // res.send("Email sent");
        console.log("myObj",myObj)
 



    const userEmail= "usamasaeed3k@gmail.com";
    const toEmails = ['usamafaheemahmed80@gmail.com', 'usamasaeed3k@gmail.com', 'tufailameen62@gmail.com'];
     // const toEmails = ['usamasaeed3k@gmail.com'];



    const mailOptions = {
        from: 'admin@denarolink.com.au',
        to: userEmail,
        // to: toEmails.join(','),

        bcc:toEmails.join(','),
        subject: 'Test Email with HTML Template',
        html: generateHtmlTemplate(myObj) // Include the HTML content here
      };
    try {
        // Send email
        console.log('Email sent:');

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        // res.send("Email sent");
    } catch (error) {
        console.error('Error:', error);
        // res.status(500).send("Error sending email");
    }
};


module.exports = assignToMailFun;
