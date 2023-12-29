const express = require('express');
const router = express.Router();

const UserPensionModel = require("../../Model/UserData/AgePension");
const UserPensionSchema = require("../../schema/UserData/AgePension");

async function PostUserData(objOfPension_Data, res, session) {
    // console.log("objOfPension_Data",objOfPension_Data)
    const UserTrackModal_test = objOfPension_Data;
    const { error } = UserPensionSchema(UserTrackModal_test);

    if (error) {
        console.log("error")

        throw new Error(error.details[0].message);
        // console.log("error2")

    }

    try {
        console.log("try")
        let UserTrack_store = new UserPensionModel(UserTrackModal_test);
        UserTrack_store = await UserTrack_store.save({ session });
        return UserTrack_store;
    } catch (error) {
        console.log("catch error")

        throw new Error(error.message);
    }
}

module.exports = PostUserData;
