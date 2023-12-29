const Express = require("express");
const MyRouter = Express.Router();

const deemed_thresholdDetails = require("../../../Model/Pension/deemed_income_thresholds/deemed_income_thresholds");
const deemed_thresholdSchema = require("../../../schema/Pension/deemed_income_thresholds/deemed_income_thresholds");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await deemed_thresholdDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newdeemed_threshold = req.body;
  const { error } = deemed_thresholdSchema(Newdeemed_threshold);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const mydeemed_threshold = await deemed_thresholdDetails.findOne({name: req.body.name});
    // if(mydeemed_threshold) return res.status(400).send("deemed_threshold is already exist");

    let Adddeemed_threshold = new deemed_thresholdDetails(Newdeemed_threshold);
    Adddeemed_threshold = await Adddeemed_threshold.save();
    res.send(Adddeemed_threshold);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updatedeemed_threshold = await deemed_thresholdDetails.findOne({ _id: req.params.id });
  
    Updatedeemed_threshold.situation = req.body.situation,
    Updatedeemed_threshold.first_deemed = req.body.first_deemed,
    Updatedeemed_threshold.first_rate = req.body.first_rate,
    Updatedeemed_threshold.over_deemed = req.body.over_deemed,
    Updatedeemed_threshold.over_rate = req.body.over_rate

  try {
    const C = await Updatedeemed_threshold.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", deemed_thresholdDetails)
  const Deletedeemed_threshold = deemed_thresholdDetails.findOne({ _id: req.params.id });
  console.log(Deletedeemed_threshold)
  try {
    const C = await Deletedeemed_threshold.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
