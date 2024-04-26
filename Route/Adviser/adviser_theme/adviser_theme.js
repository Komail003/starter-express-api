const Express = require("express");
const MyRouter = Express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises; // Import the fs module

const adviser_Details = require("../../../Model/Adviser/Adviser");

const adviser_themeDetails = require("../../../Model/Adviser/adviser_theme/adviser_theme");
const adviser_themeSchema = require("../../../schema/Adviser/adviser_theme/adviser_theme");

// const bcrypt = require('bcrypt');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG files are allowed.")
    );
  }
};

var upload = multer({

  storage: storage,
  fileFilter: fileFilter,
  // fileFilter: function(req, file, callback)
});
MyRouter.patch("/Update/:id", upload.single("ImageUrl"), async (req, res) => {
  try {
    const Updateadviser_theme = await adviser_themeDetails.findById(
      req.params.id
    );

    if (!Updateadviser_theme) {
      return res.status(404).send("Adviser theme not found");
    }

    // Store the previous image path for deletion
    const previousImagePath = Updateadviser_theme.ImageUrl;

    // Update fields
    Updateadviser_theme.set({
      name: req.body.name,
      color: req.body.color,
      ImageUrl: req.body.ImageUrl,
      Email: req.body.Email,
      Website: req.body.Website,
      // Adviser_Fk: req.body.Adviser_Fk,
      Phone: req.body.Phone,
      AppPassword: req.body.AppPassword,
      SmtpHost: req.body.SmtpHost,
      SmtpMail: req.body.SmtpMail,
      CompanyName: req.body.CompanyName,
      SmtpPort: req.body.SmtpPort,
      SmtpSecure1: req.body.SmtpSecure1,
    });

    // Update the image if a new one is provided
    if (req.file) {
      // Check if the file with the same name already exists
      const existingFilePath = path.join("uploads", req.file.filename);
      if (await fs.access(existingFilePath).then(() => true).catch(() => false)) {
        // File with the same name exists, generate a new unique filename
        const newFileName = Date.now() + path.extname(req.file.originalname);
        Updateadviser_theme.ImageUrl = path.join("uploads", newFileName);
        await fs.rename(existingFilePath, path.join("uploads", newFileName));
      } else {
        // File doesn't exist, use the provided filename
        Updateadviser_theme.ImageUrl = req.file.path;
      }
    } else {
      let url = req.body.ImageUrl;
      let desiredPart = url.split("/uploads/")[1];
      console.log(desiredPart, url)
      Updateadviser_theme.ImageUrl = desiredPart;
    }


    console.log("Updateadviser_theme.ImageUrl= ", Updateadviser_theme.ImageUrl)


    const updatedTheme = await Updateadviser_theme.save();

    // Delete the previous image
    // if (previousImagePath && previousImagePath !== Updateadviser_theme.ImageUrl) {
    //   await fs.unlink(previousImagePath);
    // }

    res.send(updatedTheme);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

MyRouter.post("/Add", upload.single("ImageUrl"), async (req, res) => {
  let Addadviser_theme = new adviser_themeDetails({
    name: req.body.name,
    color: req.body.color,
    Email: req.body.Email,
    Website: req.body.Website,
    Adviser_Fk: req.body.Adviser_Fk,
    Phone: req.body.Phone,
    AppPassword: req.body.AppPassword,
    SmtpHost: req.body.SmtpHost,
    SmtpMail: req.body.SmtpMail,
    CompanyName: req.body.CompanyName,
    SmtpPort: req.body.SmtpPort,
    SmtpSecure1: req.body.SmtpSecure1,
  });
  if (req.file) {
    Addadviser_theme.ImageUrl = req.file.path;
  }

  Addadviser_theme = await Addadviser_theme.save();
  res.send(Addadviser_theme);
});


MyRouter.delete("/Delete/:id", async (req, res) => {
  const Deleteadviser_theme = await adviser_themeDetails.findById(req.params.id);

  if (!Deleteadviser_theme) {
    return res.status(404).send("Adviser theme not found");
  }
  // Store the previous image path for deletion
  const previousImagePath = Deleteadviser_theme.ImageUrl;
  // console.log(Deleteadviser_theme);
  try {
    const C = await Deleteadviser_theme.deleteOne();
    // Delete the previous image
    if (previousImagePath) {
      await fs.unlink(previousImagePath);
    }
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

MyRouter.get("/", async (req, res) => {
  const C = await adviser_themeDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.get("/getOne/:Adviser_Fk", async (req, res) => {
  try {
    const adviser_theme = await adviser_themeDetails.findOne({
      Adviser_Fk: req.params.Adviser_Fk,
    });
    res.send(adviser_theme);
  } catch (error) {
    // console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

MyRouter.get("/getOneDomain/:Domain", async (req, res) => {

  const adviser_DetailsOne = await adviser_Details.findOne({ Domain: req.params.Domain });
  if (!adviser_DetailsOne) {
    return res.status(400).send("Adviser theme not found");
  }
  const adviserID = adviser_DetailsOne._id;

  try {
    const adviser_theme = await adviser_themeDetails.findOne({
      Adviser_Fk: adviserID,
    });

    const fullPath = adviser_theme.ImageUrl;

    const filename = fullPath.split("\\").pop();
    const baseUrl = `https://${req.get("host")}`; //* change back with https please
    adviser_theme.ImageUrl = `${baseUrl}/uploads/${filename}`;

    res.send(adviser_theme);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// image URL updated
// MyRouter.get("/", async (req, res) => {
//   try {
//     const adviser_themes = await adviser_themeDetails.find();

//     // Assuming you have a base URL for your server
//     const baseUrl = "http://localhost:7000";

//     const adviser_themesWithUpdatedUrl = adviser_themes.map(adviser_theme => {
//       const fullPath = adviser_theme.ImageUrl;
//       const filename = fullPath.split("\\").pop();
//       adviser_theme.ImageUrl = `${baseUrl}/uploads/${filename}`;
//       return adviser_theme;
//     });

//     res.json(adviser_themesWithUpdatedUrl);
//   } catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// });


module.exports = MyRouter;
