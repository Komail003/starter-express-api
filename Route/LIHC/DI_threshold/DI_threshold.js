const Express = require("express");
const MyRouter = Express.Router();

const DI_thresholdDetails = require("../../../Model/LIHC/DI_threshold/DI_threshold");
const DI_thresholdSchema = require("../../../schema/LIHC/DI_threshold/DI_threshold");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  
  try {
    console.log("komail")
    let myObj = {
      _id: "65800573517576f7d0bac579",
      adviserName: "Usama",
      Password: "$2b$10$YD5bOTtn7ODwl.4aXJptJ.tNeNvJ68VJ2srcc1FO56lJ6x7dKi3jq",
      CompanyName: "Adviser Denaro",
      Designation: "Full Stack Developer",
      CompanyAddress: "Collage Road",
      CompanyEmail: "admin@gmail.com",
      CompanyPhone: "+92-3124513576",
      DOJ: "1991-05-30",
      Package: "free",
      Opt: "1",
      SoftDelete: 0,
      RefreshToken: "Logged in",
      role: "1984",
      Domain: "Usama_Faheem"
    };
  
    return res.status(200).send({ accessToken: "Successfully Login", AdviserData: myObj });
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.get("/threshold", async (req, res) => {
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
