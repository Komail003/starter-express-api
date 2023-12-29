const Express = require("express");
const MyRouter = Express.Router();

const actual_paymentDetails = require("../../../Model/Pension/actual_payment/actual_payment");
const actual_paymentSchema = require("../../../schema/Pension/actual_payment/actual_payment");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await actual_paymentDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newactual_payment = req.body;
  const { error } = actual_paymentSchema(Newactual_payment);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myactual_payment = await actual_paymentDetails.findOne({name: req.body.name});
    // if(myactual_payment) return res.status(400).send("actual_payment is already exist");

    let Addactual_payment = new actual_paymentDetails(Newactual_payment);
    Addactual_payment = await Addactual_payment.save();
    res.send(Addactual_payment);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updateactual_payment = await actual_paymentDetails.findOne({ _id: req.params.id });
  
    Updateactual_payment.situation = req.body.situation,
    Updateactual_payment.per_fortnight = req.body.per_fortnight,
    Updateactual_payment.pharmaceutical_benefit = req.body.pharmaceutical_benefit,
    Updateactual_payment.pension_payment = req.body.pension_payment,
    Updateactual_payment.clean_energy_supplement = req.body.clean_energy_supplement


  try {
    const C = await Updateactual_payment.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", actual_paymentDetails)
  const Deleteactual_payment = actual_paymentDetails.findOne({ _id: req.params.id });
  console.log(Deleteactual_payment)
  try {
    const C = await Deleteactual_payment.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
