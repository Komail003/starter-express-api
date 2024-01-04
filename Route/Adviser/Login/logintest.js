

const Express = require("express");
const MyRouter = Express.Router();
const bcrypt = require('bcrypt');
const AdviserModal = require("../../../Model/Adviser/Adviser");



MyRouter.post("/login", async (req, res) => {
	try {
		const CheckUser = req.body;
		const FoundUser = await AdviserModal.findOne({ CompanyEmail: CheckUser.Email }).exec();

		if (FoundUser) {
			// Check the password
			const match = await bcrypt.compare(CheckUser.Password, FoundUser.Password);
			FoundUser.RefreshToken = "Logged in";
			await FoundUser.save();
			
			return res.status(200).send({accessToken:"Successfully Login", AdviserData:FoundUser});

		}
		else{
			return res.status(400).send('Invalid email or password.');
		}

	}
	catch (error) {
		console.error("Error during login:", error);
		res.status(500).send("Internal Server Error");
	  }
	
  });

module.exports = MyRouter;
