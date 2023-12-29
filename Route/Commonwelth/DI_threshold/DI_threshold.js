const Express = require("express");
const MyRouter = Express.Router();

const DI_thresholdDetails = require("../../../Model/Commonwelth/DI_threshold/DI_threshold");
const DI_thresholdSchema = require("../../../schema/Commonwelth/DI_threshold/DI_threshold");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await DI_thresholdDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const NewDI_threshold = req.body;
  const { error } = DI_thresholdSchema(NewDI_threshold);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myDI_threshold = await DI_thresholdDetails.findOne({name: req.body.name});
    // if(myDI_threshold) return res.status(400).send("DI_threshold is already exist");

    let AddDI_threshold = new DI_thresholdDetails(NewDI_threshold);
    AddDI_threshold = await AddDI_threshold.save();
    res.send(AddDI_threshold);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const UpdateDI_threshold = await DI_thresholdDetails.findOne({ _id: req.params.id });
  
    UpdateDI_threshold.situation = req.body.situation,
    UpdateDI_threshold.first_deemed = req.body.first_deemed,
    UpdateDI_threshold.first_rate = req.body.first_rate,
    UpdateDI_threshold.over_deemed = req.body.over_deemed,
    UpdateDI_threshold.over_rate = req.body.over_rate

  try {
    const C = await UpdateDI_threshold.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", DI_thresholdDetails)
  const DeleteDI_threshold = DI_thresholdDetails.findOne({ _id: req.params.id });
  console.log(DeleteDI_threshold)
  try {
    const C = await DeleteDI_threshold.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
