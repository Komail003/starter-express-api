const express = require('express');
const router = express.Router();
const Mongoose = require("mongoose");

const { MongoClient } = require('mongodb');
const PostUserTrack = require('../Adviser/UserTrack/AddUserTrack');
const PostUserData = require('../UserData/AddPension'); // Adjust the path accordingly

// Use the existing Mongoose connection
const mongooseConnection = Mongoose.connection;

// Your main function with transactions
async function main(req, res) {
    const session = await mongooseConnection.startSession();
    try {
        await session.withTransaction(async () => {
            // Call your functions within the transaction
            let objOfUserTracking = req.body.UserTracking;
            let objOfCSHC_Data = req.body.AgePension_Data;
            // res.send( objOfCSHC_Data)

            const result1 = await PostUserTrack(objOfUserTracking, res, session);

            objOfCSHC_Data.UserTracking_FK =  result1._id;
            // console.log("after geting result1",result1)
            // let myemail={UserEmail:req.body.UserEmail};
            // console.log("myemail", myemail)
            const result2 = await PostUserData(objOfCSHC_Data, res, session);
            // console.log("after geting result2",result2)

            // If all functions succeed, commit the transaction
            await session.commitTransaction();

            // Log the results if needed
            // console.log(result1);
            // console.log(result2);
        });
    } finally {
        // End the session
        if (session) {
            session.endSession();
        }
    }
}

// Your Express route
router.post("/Add", async (req, res) => {
    try {
        // Call the main function
        await main(req, res);

        // Respond with success
        res.status(200).json({ message: 'Functions executed successfully' });
    } catch (error) {
        // console.error('Error:', error.message);
        res.status(500).send( error.message);

        // res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
