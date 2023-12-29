const express = require('express');
const router = express.Router();

const UserLIHCModel = require("../../Model/UserData/LIHC");
const UserLIHCSchema = require("../../schema/UserData/LIHC");

async function PostUserData(objOfLIHC_Data, res, session) {
    // console.log("objOfLIHC_Data",objOfLIHC_Data)
    const UserTrackModal_test = objOfLIHC_Data;
    const { error } = UserLIHCSchema(UserTrackModal_test);

    if (error) {
        console.log("error")

        throw new Error(error.details[0].message);
        // console.log("error2")

    }

    try {
        console.log("try")
        let UserTrack_store = new UserLIHCModel(UserTrackModal_test);
        UserTrack_store = await UserTrack_store.save({ session });
        return UserTrack_store;
    } catch (error) {
        console.log("catch error")

        throw new Error(error.message);
    }
}

module.exports = PostUserData;
