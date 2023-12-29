const Express = require("express");
const MyRouter = Express.Router();

const Super_Admin_Details = require("../../Model/super_admin/super_admin");
const Super_Admin_Schema = require("../../schema/super_admin/super_admin");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await Super_Admin_Details.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/auth", async (req, res) => {
  const Admin_auth = req.body;
  const { error } = Super_Admin_Schema(Admin_auth);
  if (error) return res.status(404).send({ message: error.details[0].message });

  let admin= await Super_Admin_Details.findOne({email: req.body.email, password: req.body.password});
  if(!admin) return res.send(false);

  // let adminpass= await Super_Admin_Details.findOne({password: req.body.password});
  // if(!adminpass) return res.status(404).send("Invalid email or password.");
  
 res.send(true)
});

MyRouter.post("/Add", async (req, res) => {
  const NewAdmin = req.body;
  const { error } = Super_Admin_Schema(NewAdmin);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    // const myAdmin = await Super_Admin_Details.findOne({name: req.body.name});
    // if(myAdmin) return res.status(400).send("Admin is already exist");

    let AddAdmin = new Super_Admin_Details(NewAdmin);
    AddAdmin = await AddAdmin.save();
    res.send(AddAdmin);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const UpdateAdmin = await Super_Admin_Details.findOne({ _id: req.params.id });
  
    UpdateAdmin.email = req.body.email,
    UpdateAdmin.password = req.body.password

  try {
    const C = await UpdateAdmin.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", Super_Admin_Details)
  const DeleteAdmin = Super_Admin_Details.findOne({ _id: req.params.id });
  console.log(DeleteAdmin)
  try {
    const C = await DeleteAdmin.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
