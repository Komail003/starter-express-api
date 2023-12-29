const Express = require("express");
const MyRouter = Express.Router();

const reduced_by_Details = require("../../../Model/Pension/reduced_by/reduced_by");
const reduced_by_Schema = require("../../../schema/Pension/reduced_by/reduced_by");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await reduced_by_Details.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newreduced_by = req.body;
  const { error } = reduced_by_Schema(Newreduced_by);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myreduced_by = await reduced_by_Details.findOne({name: req.body.name});
    // if(myreduced_by) return res.status(400).send("reduced_by is already exist");

    let Addreduced_by = new reduced_by_Details(Newreduced_by);
    Addreduced_by = await Addreduced_by.save();
    res.send(Addreduced_by);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updatereduced_by = await reduced_by_Details.findOne({ _id: req.params.id });
  
    Updatereduced_by.dividing_factor = req.body.dividing_factor,
    Updatereduced_by.reduction_rate = req.body.reduction_rate


  try {
    const C = await Updatereduced_by.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", reduced_by_Details)
  const Deletereduced_by = reduced_by_Details.findOne({ _id: req.params.id });
  console.log(Deletereduced_by)
  try {
    const C = await Deletereduced_by.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
