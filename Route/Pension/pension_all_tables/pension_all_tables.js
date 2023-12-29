const Express = require("express");
const MyRouter = Express.Router();

const actual_paymentDetails = require("../../../Model/Pension/actual_payment/actual_payment");
const asset_testDetails = require("../../../Model/Pension/assets_test/assets_test");
const deemed_thresholdDetails = require("../../../Model/Pension/deemed_income_thresholds/deemed_income_thresholds");
const deeming_ratesDetails = require("../../../Model/Pension/deeming_rates/deeming_rates");
const income_testDetails = require("../../../Model/Pension/income_test/income_test");
const reduced_by_Details = require("../../../Model/Pension/reduced_by/reduced_by");
const work_bonus_Details = require("../../../Model/Pension/work_bonus/work_bonus");




MyRouter.get("/", async (req, res) => {
	const actual_payment = await actual_paymentDetails.find();
	const asset_test = await asset_testDetails.find();
	const deemed_threshold = await deemed_thresholdDetails.find();
	const deeming_rates = await deeming_ratesDetails.find();
	const income_test = await income_testDetails.find();
	const reduced_by = await reduced_by_Details.find();
	const work_bonus = await work_bonus_Details.find().select('-_id name work_bonus_fortnight work_bonus_half_fortnight');


const myAllTables = [
				{actual_payment:actual_payment},
				{asset_test: asset_test},
				{deemed_threshold:deemed_threshold},

				{deeming_rates:deeming_rates},
				{income_test: income_test},
				{reduced_by:reduced_by},
				{work_bonus:work_bonus}


			   ];
	try {
		// console.log(myAllTables[0].deeming_rates[0])
	  res.send(myAllTables);
	} catch (err) {
	  res.send("Error: " + err);
	}
  });

module.exports = MyRouter;
