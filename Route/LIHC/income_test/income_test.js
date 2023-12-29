const Express = require("express");
const MyRouter = Express.Router();

const income_testDetails = require("../../../Model/LIHC/income_test/income_test");
const income_testSchema = require("../../../schema/LIHC/income_test/income_test");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await income_testDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newincome_test = req.body;
  const { error } = income_testSchema(Newincome_test);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myincome_test = await income_testDetails.findOne({name: req.body.name});
    // if(myincome_test) return res.status(400).send("income_test is already exist");

    let Addincome_test = new income_testDetails(Newincome_test);
    Addincome_test = await Addincome_test.save();
    res.send(Addincome_test);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updateincome_test = await income_testDetails.findOne({ _id: req.params.id });
  
    Updateincome_test.situation = req.body.situation,
    Updateincome_test.weekly_income = req.body.weekly_income,
    Updateincome_test.eight_week_income = req.body.eight_week_income

  try {
    const C = await Updateincome_test.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", income_testDetails)
  const Deleteincome_test = income_testDetails.findOne({ _id: req.params.id });
  console.log(Deleteincome_test)
  try {
    const C = await Deleteincome_test.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
