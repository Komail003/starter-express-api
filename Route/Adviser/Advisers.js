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
    // console.log("Advisers else")
    const domain = await AdviserModal.findOne({ Domain: req.body.Domain });
    if (domain) return res.status(400).send("Domain already exist.");

    const duplicate = await AdviserModal.find({
      $or: [{ CompanyEmail: AdviserModal_test.CompanyEmail }, { adviserName: AdviserModal_test.adviserName }]
    }).exec();
    // console.log(duplicate);

    if (duplicate.length > 0) { return res.status(400).json({ "message": "User already exist" }) };

    try {
      const hashedPwd = await bcrypt.hash(AdviserModal_test.Password, 10);

      AdviserModal_test.Password = hashedPwd;

      let AdviserModal_store = new AdviserModal(AdviserModal_test);
      // console.log("AdviserModal_store before save")
      AdviserModal_store = await AdviserModal_store.save();
      // console.log("AdviserModal_store after save")


      

      res.send(AdviserModal_store);

    } catch (error) {
      res.status(500).json({ "message": error.message });
    }
  }
}

let UpdateAdvisers = async (req, res) => {
  const AdviserModal_test = req.body;

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

    // if (AdviserModal_test.Domain !== UpdateAdviser.Domain) {
    //   const domain = await AdviserModal.findOne({ Domain: AdviserModal_test.Domain });
    //   if (domain) return res.status(400).send("Domain already exist.");
    //   UpdateAdviser.Domain = AdviserModal_test.Domain;
    // }  //! Bad ma Dakhan ga Domain ko update karna k masla 

    // Update adviser properties
    UpdateAdviser.adviserName = AdviserModal_test.adviserName;

    UpdateAdviser.CompanyName = AdviserModal_test.CompanyName;
    UpdateAdviser.Designation = AdviserModal_test.Designation;
    UpdateAdviser.CompanyAddress = AdviserModal_test.CompanyAddress;
    UpdateAdviser.CompanyEmail = AdviserModal_test.CompanyEmail;
    UpdateAdviser.CompanyPhone = AdviserModal_test.CompanyPhone;
    UpdateAdviser.Subscribed_for = AdviserModal_test.Subscribed_for;
    UpdateAdviser.Subscribe_Date = AdviserModal_test.Subscribe_Date;
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

router.patch("/update_password/:id", async (req, res) => {
  console.log("update password",req.body)
  const UpdateAdvisor = await AdviserModal.findOne({ _id: req.params.id });
  let previousPasswordDB= UpdateAdvisor.Password;
  let previousPassword_User= req.body.password;


  const validPassword = await bcrypt.compare(req.body.Password, previousPasswordDB); // change
  if (!validPassword) return res.status(400).send(false);
  console.log("password matched")

  const hashedPwd = await bcrypt.hash(req.body.new_password, 10);
  UpdateAdvisor.Password = hashedPwd;
  


  try {
    const C = await UpdateAdvisor.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/", GetAll);

router.post("/Add", PostAdviser);

router.patch("/Update", UpdateAdvisers);

router.delete("/Delete/:id", DeleteAdvisers);



module.exports = router;