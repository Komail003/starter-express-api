const Express = require("express");
const MyRouter = Express.Router();

const deeming_ratesDetails = require("../../../Model/LIHC/deeming_rates/deeming_rates");

const DI_thresholdDetails = require("../../../Model/LIHC/DI_threshold/DI_threshold");

const income_testDetails = require("../../../Model/LIHC/income_test/income_test");


MyRouter.get("/", async (req, res) => {
	const deemingrates = await deeming_ratesDetails.find();
	const DI_threshold = await DI_thresholdDetails.find();
	const income = await income_testDetails.find();
const myAllTables = [
				{deeming_rates:deemingrates},
				{DI_Threshold: DI_threshold},
				{income:income}
			   ];
	try {
		// console.log(myAllTables[0].deeming_rates[0])
	  res.send(myAllTables);
	} catch (err) {
	  res.send("Error: " + err);
	}
  });

module.exports = MyRouter;
