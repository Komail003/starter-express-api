const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AdviserModal = require("../../../Model/Adviser/Adviser");

let LoggingIn = async (req, res) => {
  console.log("hy login")
  try {
    const CheckUser = req.body;
    // Use await to wait for the query result
    const FoundUser = await AdviserModal.findOne({ CompanyEmail: CheckUser.Email }).exec();
    // console.log(FoundUser);
    // Check if any user was found
    if (FoundUser) {
      // Check the password

      const match = await bcrypt.compare(CheckUser.Password, FoundUser.Password);

      if (match) {

        // JsonWebToken
        // const roles = Object.values(FoundUser.role);
        const roles = FoundUser.role;

        //saving token
        const accessToken = jwt.sign(
          {
            "Userinfo": {
              "_id": FoundUser._id,
              "roles": roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10min"  // in production make it 5 min or 10min 
          }
        );

        const refreshToken = jwt.sign(
          { "id": FoundUser._id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "60min"  // in production make it 5 min or 10min 
          }
        );

        FoundUser.RefreshToken = refreshToken;

        // console.log(FoundUser);

        await FoundUser.save();


        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          sameSite: "None", secure: true,
          // maxAge: 24 * 60 * 60 * 1000
        });

        // res.status(201).json({"success":`user logged in `})
        FoundUser.RefreshToken = undefined;
        res.status(201).json({ accessToken, AdviserData:FoundUser });
      } else {
        res.status(400).json({ "massage": `password does't match` })
      }
    } else {
      res.status(400).json({ "massage": `Account Found` })
    }

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

router.post("/", LoggingIn);

module.exports = router;
