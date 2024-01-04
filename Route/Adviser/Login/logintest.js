const Express = require("express");
const MyRouter = Express.Router();
const bcrypt = require("bcrypt");
const AdviserModal = require("../../../Model/Adviser/Adviser");

MyRouter.post("/login", async (req, res) => {
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
//   try {
//     console.log(req.body);

//     const CheckUser = req.body;
//     const FoundUser = await AdviserModal.findOne({
//       CompanyEmail: CheckUser.Email,
//     }).exec();

//     if (FoundUser) {
//       // Check the password
//       const match = await bcrypt.compare(
//         CheckUser.Password,
//         FoundUser.Password
//       );

//       FoundUser.RefreshToken = "Logged in";
//       await FoundUser.save();

//       return res
//         .status(200)
//         .send({ accessToken: "Successfully Login", AdviserData: FoundUser });
//     } else {
//       return res.status(400).send("Invalid email or password.");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).send("Internal Server Error");
//   }
});

module.exports = MyRouter;
