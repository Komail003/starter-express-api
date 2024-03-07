const Express = require("express");
const MyRouter = Express.Router();

const Super_Admin_Details = require("../../Model/super_admin/super_admin");
const Super_Admin_Schema = require("../../schema/super_admin/super_admin");

const bcrypt = require("bcrypt");

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

  let admin = await Super_Admin_Details.findOne({ email: req.body.email });
  if (!admin) return res.status(404).send("User Not Found");

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send(false);

  res.send(admin);
});

MyRouter.post("/Add", async (req, res) => {
  const NewAdmin = req.body;
  const { error } = Super_Admin_Schema(NewAdmin);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } else {
    const myAdmin = await Super_Admin_Details.findOne({
      email: req.body.email,
    });
    if (myAdmin) return res.status(400).send("User is already exist");
    try {
      const hashedPwd = await bcrypt.hash(NewAdmin.password, 10);
      NewAdmin.password = hashedPwd;

      let AddAdmin = new Super_Admin_Details(NewAdmin);
      AddAdmin = await AddAdmin.save();
      res.send(AddAdmin);
    } catch (err) {
      res.send("Error: " + err);
    }
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const UpdateAdmin = await Super_Admin_Details.findOne({ _id: req.params.id });

  (UpdateAdmin.email = req.body.email),
    // UpdateAdmin.password = req.body.password,
    (UpdateAdmin.name = req.body.name),
    (UpdateAdmin.designation = req.body.designation),
    (UpdateAdmin.role = req.body.role);

  try {
    const C = await UpdateAdmin.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.patch("/update_password/:id", async (req, res) => {
  console.log("update password", req.body);
  const UpdateAdmin = await Super_Admin_Details.findOne({ _id: req.params.id });
  if (!UpdateAdmin) return res.status(400).send("user not found");

  let previousPasswordDB = UpdateAdmin.password;

  const validPassword = await bcrypt.compare(
    req.body.password,
    previousPasswordDB
  );
  if (!validPassword) return res.status(400).send(false);
  // console.log("password matched")

  const hashedPwd = await bcrypt.hash(req.body.new_password, 10);
  UpdateAdmin.password = hashedPwd;

  try {
    const C = await UpdateAdmin.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.patch("/update_Forget_password/", async (req, res) => {
  const password = req.body.password;
  const adminEmail = req.body.email;

  const Admin = await Super_Admin_Details.findOne({ email: adminEmail });

  if (!Admin) {
    return res.status(404).send({ message: "User not found" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  Admin.password = hashedPwd;

  try {
    const C = await Admin.save();
    res.send(true);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id", async (req, res) => {
  console.log("delete api: ", Super_Admin_Details);
  const DeleteAdmin = Super_Admin_Details.findOne({ _id: req.params.id });
  console.log(DeleteAdmin);
  try {
    const C = await DeleteAdmin.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
