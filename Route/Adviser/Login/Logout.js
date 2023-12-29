const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ObjectId } = require('mongoose').Types; // Import ObjectId from Mongoose

const AdviserModal = require("../../../Model/Adviser/Adviser");

let Logout = async (req, res) => {
    // console.log(req);

    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(400).json({ "message": "you don't have cookies" });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await AdviserModal.findOne({ RefreshToken: refreshToken }).exec();
   
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(400).json({ "message": "User does't exist" });
    }


    foundUser.RefreshToken = "";
    await foundUser.save();
    // console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite:"None", secure:true }); //secure :true -only server on https!
    res.status(200).json({ "message": "Uer Logged Out" });
};

router.get("/", Logout);

module.exports = router;
