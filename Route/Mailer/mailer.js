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
const generateHtmlTemplate = (recipientName) =>`
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
            <p>Hello ${recipientName.name},</p>
            <p>Hello ${recipientName.phone},</p>



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

MyRouter.post("/", async (req, res) => {
    const myObj=req.body;
    const userEmail=req.body.email;
    const toEmails = ['farheenmohsin08@gmail.com', 'usamasaeed3k@gmail.com', '0021mian@gmail.com'];


    const mailOptions = {
        from: 'usamafaheem80@gmail.com',
        // to: userEmail,
        to: toEmails.join(','),

        // BCC:"",
        subject: 'Test Email with HTML Template',
        html: generateHtmlTemplate(myObj) // Include the HTML content here
      };
    try {
        // Send email

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.send("Email sent");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error sending email");
    }
});


module.exports = MyRouter;
