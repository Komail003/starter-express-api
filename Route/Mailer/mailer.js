const Express = require("express");
const MyRouter = Express.Router();
const nodemailer = require('nodemailer');



// Create a transporter using SMTP with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'usamasaeed3k@gmail.com', // Your Gmail email address
    pass: 'flpsrpubkwvylcys' // Use the app password generated in your Google account
  },
  tls: {
    rejectUnauthorized: false
  }
});

// HTML email template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            margin-top: 20px;
        }

        header {
            background-color: #4caf50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
            font-size: 24px;
        }

        .hero {
            text-align: center;
            padding: 20px;
            background-color: #4caf50;
            color: #ffffff;
        }

        section {
            padding: 20px;
            text-align: left;
        }

        button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }

        footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background-color: #4caf50;
            color: #ffffff;
            border-radius: 0 0 5px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Your Company Name</h1>
        </header>

        <div class="hero">
            <h2>Welcome to Our Newsletter!</h2>
            <p>Stay updated with the latest news and offers.</p>
        </div>

        <section>
            <p>Hello [Recipient Name],</p>

            <p>We are excited to share some exciting news with you:</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin blandit mauris ac justo blandit, vel consectetur orci viverra.</p>

            <button href="#">Read More</button>
        </section>

        <footer>
            <p>Follow us on social media:</p>
            <p>Facebook | Twitter | Instagram</p>
        </footer>
    </div>
</body>
</html>

`;

// Email content
const mailOptions = {
  from: 'usamasaeed3k@gmail.com',
  to: 'usamasaeed3k@gmail.com',
  subject: 'Test Email with HTML Template',
  html: htmlTemplate // Include the HTML content here
};



MyRouter.post("/", async (req, res) => {
  // Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error:', error);
    }
    console.log('Email sent:', info.response);
    res.send("Email sent");
  });  
    
});


module.exports = MyRouter;
