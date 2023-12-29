const Express = require("express");
const MyRouter = Express.Router();

const work_bonus_Details = require("../../../Model/Pension/work_bonus/work_bonus");
const work_bonus_Schema = require("../../../schema/Pension/work_bonus/work_bonus");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await work_bonus_Details.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newwork_bonus = req.body;
  const { error } = work_bonus_Schema(Newwork_bonus);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const mywork_bonus = await work_bonus_Details.findOne({name: req.body.name});
    // if(mywork_bonus) return res.status(400).send("work_bonus is already exist");

    let Addwork_bonus = new work_bonus_Details(Newwork_bonus);
    Addwork_bonus = await Addwork_bonus.save();
    res.send(Addwork_bonus);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updatework_bonus = await work_bonus_Details.findOne({ _id: req.params.id });
    Updatework_bonus.name = req.body.name, 
    Updatework_bonus.work_bonus_fortnight = req.body.work_bonus_fortnight,
    Updatework_bonus.work_bonus_half_fortnight = req.body.work_bonus_half_fortnight


  try {
    const C = await Updatework_bonus.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", work_bonus_Details)
  const Deletework_bonus = work_bonus_Details.findOne({ _id: req.params.id });
  console.log(Deletework_bonus)
  try {
    const C = await Deletework_bonus.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
