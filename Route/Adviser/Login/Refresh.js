const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ObjectId } = require('mongoose').Types; // Import ObjectId from Mongoose

const AdviserModal = require("../../../Model/Adviser/Adviser");

let RefreshToken = async (req, res) => {
    // console.log(req);

    // Use req.cookies instead of req.cookie
    const cookies = req.cookies;

    // console.log(req.cookie);

    // return res.send(cookies)


    if (!cookies?.jwt) {
        return res.status(400).json({ "message": "you don't have cookies" });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await AdviserModal.findOne({ RefreshToken: refreshToken }).exec();
    // console.log("ma error hun", foundUser);

    if (!foundUser) return res.status(400).json({ "message": "User does't exist" });

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
        //   console.log("found Id =", foundUser._id, "Decode id=", decoded.id, "error=", err);
      
          // Convert foundUser._id to a string for comparison
          const foundUserIdString = foundUser._id.toString();
      
        //   console.log(foundUserIdString !== decoded.id);
      
          if (err || (foundUserIdString !== decoded.id)) {
            return res.sendStatus(403);
          }
      
          const roles = foundUser.role;
      
          const accessToken = jwt.sign(
            {
              "Userinfo": {
                "id": decoded.id,
                "roles": roles
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5min' }
          );
      
          res.json({ accessToken });
        }
      );
};

router.get("/", RefreshToken);

module.exports = router;
