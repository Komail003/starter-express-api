const Express = require("express");
const MyRouter = Express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'admin@denarolink.com.au',
        pass: '&6LjfQ##InXHkM&s',
    },
});

const pdfAttachment = {
    filename: 'Age Pension Calculator Report.pdf',
    path: './Age Pension Calculator Report.pdf',
    encoding: 'base64',
};

const logoAttachment = {
    filename: 'logo.png',
    path: './logo-1.png',
    encoding: 'base64',
    cid: 'logo',
};

const mailOptions = {
    from: 'admin@denarolink.com.au',
    to: 'usamasaeed3k@gmail.com', // Replace with the recipient's email address
    bcc: ['usamafaheem80@gmail.com', 'komailabbas376@gmail.com'], // BCC recipients
    subject: 'Age Pension Calculator Report',
    html: `
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
	<!--[if gte mso 9]>
	<xml>
	  <o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
	  </o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <meta name="x-apple-disable-message-reformatting">
	  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
	  <title></title>
	  
		<style type="text/css">
		  @media only screen and (min-width: 520px) {
	  .u-row {
		width: 500px !important;
	  }
	  .u-row .u-col {
		vertical-align: top;
	  }
	
	  .u-row .u-col-100 {
		width: 500px !important;
	  }
	
	}
	
	@media (max-width: 520px) {
	  .u-row-container {
		max-width: 100% !important;
		padding-left: 0px !important;
		padding-right: 0px !important;
	  }
	  .u-row .u-col {
		min-width: 320px !important;
		max-width: 100% !important;
		display: block !important;
	  }
	  .u-row {
		width: 100% !important;
	  }
	  .u-col {
		width: 100% !important;
	  }
	  .u-col > div {
		margin: 0 auto;
	  }
	}
	body {
	  margin: 0;
	  padding: 0;
	}
	
	table,
	tr,
	td {
	  vertical-align: top;
	  border-collapse: collapse;
	}
	
	p {
	  margin: 0;
	}
	
	.ie-container table,
	.mso-container table {
	  table-layout: fixed;
	}
	
	* {
	  line-height: inherit;
	}
	
	a[x-apple-data-detectors="true"] {
	  color: inherit !important;
	  text-decoration: none !important;
	}
	
	table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
		</style>
	  
	  
	
	<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
	
	</head>
	
	<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
	  <!--[if IE]><div class="ie-container"><![endif]-->
	  <!--[if mso]><div class="mso-container"><![endif]-->
	  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
	  <tbody>
	  <tr style="vertical-align: top">
		<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
		
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
	<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;">
	  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="line-height: 140%;">Hi '.$name.'.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%;text-align: justify;">Thanks for completing the Advisor Link eligibility calculator. Please find attached a copy of your results.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%; text-align: justify;">We\'d love you to get in touch to discuss your results.<span style="color: #000000; line-height: 19.6px;"> <span style="line-height: 19.6px; color: #2dc26b;"><a rel="noopener" href="https://calendly.com/denarolink" target="_blank" style="color: #2dc26b;"><span style="text-decoration: underline; line-height: 19.6px;">Click here to organise a free, no-obligation 30-minute chat.</span></a></span></span></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%; text-align: justify;">Eligibility rules for The Age Pension and concession cards can be complex, and you may be eligible for more than you realise. We want to help you get every dollar and discount you are entitled to.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%;"></p>
	<p style="line-height: 140%;">Advisor Link.</p>
	<p style="line-height: 140%;"></p>
	<p style="line-height: 140%; text-align: justify;"><strong>P.S.</strong> Over the next month, we will send you some real-life success stories of clients we have helped navigate the complex Centrelink system to get their fair share of entitlements.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 300px 1px 1px;font-family:arial,helvetica,sans-serif;" align="left">
			
	<table width="100%" cellpadding="0" cellspacing="0" border="0">
	  <tr>
		<td style="padding-right: 0px;padding-left: 0px;" align="left">
		  
		  <img align="left" border="0" src="cid:logo" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 199px;" width="199"/>
		  
		</td>
	  </tr>
	</table>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%; text-align: justify;font-size: 9px;">You received this email because you have downloaded a resource from our website.This email contains information that is general in nature and does not take into account the objectives, financial situation or needs of any particular person. It does not represent legal, tax, or personal advice and should not be relied on as such. You should obtain financial advice relevant to your circumstances before making any decisions.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%; text-align: justify; font-size: 9px;">Denaro Wealth Pty Ltd, ABN 23 625 686 464. Corporate Authorised Representative (NO. 1263750) of Lifespan Financial Planning Pty Ltd ABN 23 065 921 735, Australian Financial Services Licensee and Australian Credit Licence No. 229892.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; font-size: 9px; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%; font-size: 9px;">Ground Floor, Corporate One, 84 Hotham Street, Preston VIC 3072.</p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="font-family: "Raleway",sans-serif; font-size: 13px; line-height: 140%; text-align: justify; word-wrap: break-word;">
		<p style="line-height: 140%;text-align: justify;"><span style="color: #2dc26b; line-height: 18.2px;"><a rel="noopener" href="https://calendly.com/denarolink" target="_blank" style="color: #2dc26b;">unsubscribe.</a></span></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
	  </tr>
	  </tbody>
	  </table>
	  <!--[if mso]></div><![endif]-->
	  <!--[if IE]></div><![endif]-->
	</body>
	
	</html>
    `,
    attachments: [pdfAttachment, logoAttachment],
};

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.error('Error sending email:', error);
//     }
//     console.log('Email sent:', info.response);
// });


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