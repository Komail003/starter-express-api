const Express = require("express");
const MyRouter = Express.Router();
const nodemailer = require('nodemailer');
const AdviserModal = require("../../Model/Adviser/Adviser");


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
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .title {
      color: #4CAF50;
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
    <h1 class="company_name">${myObj.CompanyName}</h1>

    <!-- <h2 class="title">Reminder</h2> -->
    <p>Hello ${myObj.clientName},</p>
    <p>I hope this message finds you well. We're delighted to inform you that it's time to take the next step in our process. To proceed, we kindly request you to complete the following form by clicking on the link provided below:</p>
   <a href=${myObj.domainName}>${myObj.domainName}</a>
    
    <p>
      Your prompt completion of this form is vital for us to maintain the quality of our services. Should you have any inquiries or require assistance with the form, please don't hesitate to reach out to us at ${myObj.CompanyEmail}.
    </p>

   
  </div>
</body>
</html>
`;


MyRouter.post("/", async (req, res) => {
  const myObj=req.body;
      // res.send("Email sent");
      console.log("myObj",myObj)

      const adviser = await AdviserModal.findOne({ _id: myObj.adviserID });

      myObj.CompanyName = adviser.CompanyName,
      myObj.CompanyEmail = adviser.CompanyEmail


  // if (!adviser) {
  //   return res.status(404).send("User not found");
  // }


  const userEmail= myObj.clientEmail;
  const toEmails = ['usamafaheemahmed80@gmail.com', 'usamasaeed3k@gmail.com', 'fahadg5015@gmail.com','nat@denarolink.com.au'];
  // const toEmails = ['usamafaheemahmed80@gmail.com', 'usamasaeed3k@gmail.com'];
  //  const toEmails = myObj.clientEmail;



  const mailOptions = {
      from: 'usamafaheem80@gmail.com',
      to: userEmail,
      // to: toEmails.join(','),

      bcc:toEmails.join(','),
      subject: 'Adviser Link',
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
      // res.status(500).send("Error sending email");
  }
});

module.exports = MyRouter;
