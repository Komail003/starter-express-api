const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');


const AdviserModal = require("../../Model/Adviser/Adviser");
const AdviserSchema = require("../../schema/Adviser/Adviser");

let GetAll = async (req, res) => {
    const C = await AdviserModal.find();
    try {
      res.send(C);
    } catch (err) {
      res.send("Error: " + err);
    }
}

let PostAdviser = async (req, res) => {

    const AdviserModal_test = req.body;
    const { error } = AdviserSchema(AdviserModal_test);
    // if (error) return res.status(400).send(error.details[0].message);
    if (error) {
      res.status(404).send({ message: error.details[0].message });
    } 
    else {
console.log("Advisers else")
    const domain = await AdviserModal.findOne({Domain: req.body.Domain});
	  if(domain) return res.status(400).send("Domain already exist.");
    // console.log("domain:",domain)
      // const duplicate = await AdviserModal.find({ CompanyEmail: AdviserModal_test.CompanyEmail}, { adviserName: AdviserModal_test.adviserName }).exec();
      const duplicate = await AdviserModal.find({
        $or: [{ CompanyEmail: AdviserModal_test.CompanyEmail }, { adviserName: AdviserModal_test.adviserName }]
      }).exec();
      console.log(duplicate);

      if (duplicate.length > 0){ return res.status(400).json({ "message": "User already exist" })};
   
      try {
        const hashedPwd = await bcrypt.hash(AdviserModal_test.Password, 10);

      // console.log(hashedPwd);


        AdviserModal_test.Password = hashedPwd;

      let AdviserModal_store = new AdviserModal(AdviserModal_test);
      console.log("AdviserModal_store before save")
      AdviserModal_store = await AdviserModal_store.save();
      console.log("AdviserModal_store after save")

      res.send(AdviserModal_store);

      } catch (error) {
        res.status(500).json({ "message": error.message });
      }





    }
}

let UpdateAdvisers = async (req, res) => {
    const AdviserModal_test = req.body;

  // console.log(req.body);

    try {
      // Find the existing adviser by ID
      const UpdateAdviser = await AdviserModal.findOne({ _id: AdviserModal_test._id });
  
      if (!UpdateAdviser) {
        return res.status(404).send({ message: "Adviser not found" });
      }
  
      const { error } = AdviserSchema(AdviserModal_test);
  
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      } 
  
      const hashedPwd = await bcrypt.hash(AdviserModal_test.Password, 10);

      // Update adviser properties
      UpdateAdviser.adviserName = AdviserModal_test.adviserName;
      UpdateAdviser.Password = hashedPwd;
      UpdateAdviser.CompanyName = AdviserModal_test.CompanyName;
      UpdateAdviser.Designation = AdviserModal_test.Designation;
      UpdateAdviser.CompanyAddress = AdviserModal_test.CompanyAddress;
      UpdateAdviser.CompanyEmail = AdviserModal_test.CompanyEmail;
      UpdateAdviser.CompanyPhone = AdviserModal_test.CompanyPhone;
      UpdateAdviser.DOJ = AdviserModal_test.DOJ;
      UpdateAdviser.Package = AdviserModal_test.Package;
      UpdateAdviser.Opt = AdviserModal_test.Opt;
      UpdateAdviser.SoftDelete = AdviserModal_test.SoftDelete;
  
      // Save the updated adviser
      const updatedAdviser = await UpdateAdviser.save();
      
      res.send(updatedAdviser);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
  
let DeleteAdvisers = async (req, res) => {
    const AdviserModal_test = req.params.id;
    const DeleteAdviser = AdviserModal.findOne({ _id: AdviserModal_test });
    try {
      const C = await DeleteAdviser.deleteOne();
      res.send(C);
    } catch (Error) {
      res.send("Error: " + Error);
    }
}

router.get("/", GetAll);

router.post("/Add", PostAdviser);

router.patch("/Update", UpdateAdvisers);

router.delete("/Delete/:id", DeleteAdvisers);



module.exports = router;