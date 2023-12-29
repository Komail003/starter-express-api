const Express = require("express");
const MyRouter = Express.Router();

const asset_testDetails = require("../../../Model/Pension/assets_test/assets_test");
const asset_testSchema = require("../../../schema/Pension/assets_test/assets_test");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
   
  const C = await asset_testDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newasset_test = req.body;
  const { error } = asset_testSchema(Newasset_test);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myasset_test = await asset_testDetails.findOne({name: req.body.name});
    // if(myasset_test) return res.status(400).send("asset_test is already exist");

    let Addasset_test = new asset_testDetails(Newasset_test);
    Addasset_test = await Addasset_test.save();
    res.send(Addasset_test);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  // console.log(req.params.id);
  const Updateasset_test = await asset_testDetails.findOne({ _id: req.params.id });

  // console.log(Updateasset_test);

    Updateasset_test.situation = req.body.situation,
    Updateasset_test.home_owner_full_pension = req.body.home_owner_full_pension,
    Updateasset_test.home_owner_part_pension = req.body.home_owner_part_pension,
    Updateasset_test.non_home_owner_full_pension = req.body.non_home_owner_full_pension,
    Updateasset_test.non_home_owner_part_pension = req.body.non_home_owner_part_pension


    
  try {
    const C = await Updateasset_test.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", asset_testDetails)
  const Deleteasset_test = asset_testDetails.findOne({ _id: req.params.id });
  console.log(Deleteasset_test)
  try {
    const C = await Deleteasset_test.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
