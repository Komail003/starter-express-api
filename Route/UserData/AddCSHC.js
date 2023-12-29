const express = require('express');
const router = express.Router();

const UserCSHCModel = require("../../Model/UserData/CSHC");
const UserCSHCSchema = require("../../schema/UserData/CSHC");

async function PostUserData(objOfCSHC_Data, res, session) {
    // console.log("objOfCSHC_Data",objOfCSHC_Data)
    const UserTrackModal_test = objOfCSHC_Data;
    const { error } = UserCSHCSchema(UserTrackModal_test);

    if (error) {
        console.log("error")

        throw new Error(error.details[0].message);
        // console.log("error2")

    }

    try {
        console.log("try")
        let UserTrack_store = new UserCSHCModel(UserTrackModal_test);
        UserTrack_store = await UserTrack_store.save({ session });
        return UserTrack_store;
    } catch (error) {
        console.log("catch error")

        throw new Error(error.message);
    }
}

module.exports = PostUserData;
