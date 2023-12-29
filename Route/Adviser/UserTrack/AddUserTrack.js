const express = require('express');
const router = express.Router();

const UserTrackModal = require("../../../Model/UserTrack/UserTrack");
const UserTrackSchema = require("../../../schema/UserTrack/UserTrack");

async function PostUserTrack(objOfUserTracking, res, session) {
    console.log("PostUserTrack CSHC")

    const UserTrackModal_test = objOfUserTracking;
    // console.log("PostUserTrack", UserTrackModal_test)

    const { error } = UserTrackSchema(UserTrackModal_test);

    if (error) {
        throw new Error(error.details[0].message);
    }

    try {
        const C = await UserTrackModal.find({ isDuplicated: false }).session(session);
        UserTrackModal_test.Order = C.length + 1;

        let UserTrack_store = new UserTrackModal(UserTrackModal_test);
        UserTrack_store = await UserTrack_store.save({ session });
        // console.log("added successfully")
        // console.log("added successfully2",UserTrack_store)
        return UserTrack_store;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = PostUserTrack;
