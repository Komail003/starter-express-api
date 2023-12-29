const express = require('express');
const router = express.Router();

const UserTrackModal = require("../../../Model/UserTrack/UserTrack");
const UserTrackSchema = require("../../../schema/UserTrack/UserTrack");

let GetAll = async (req, res) => {
    const C = await UserTrackModal.find().sort({ Order: 1 });
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let PostUser = async (req, res) => {
    const UserTrackModal_test = req.body;
    const { error } = UserTrackSchema(UserTrackModal_test);
    // if (error) return res.status(400).send(error.details[0].message);
    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {
        try {
            const C = await UserTrackModal.find({ isDuplicated: false });
            UserTrackModal_test.Order = C.length+1;

            let UserTrack_store = new UserTrackModal(UserTrackModal_test);
            UserTrack_store = await UserTrack_store.save();
            res.send(UserTrack_store);

        } catch (error) {
            res.status(500).json({ "message": error.message });
        }
    }
}

let UpdateUsers = async (req, res) => {
    const UserTrack_Object = req.body;

    try {
        // Find the existing User by ID
        let UpdateUser = await UserTrackModal.findOne({ _id: UserTrack_Object._id });

        if (!UpdateUser) {
            return res.status(404).send({ message: "User not found" });
        }

        const { error } = UserTrackSchema(UserTrack_Object);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //! you must check Full schema for Updating in Other Tables

        UpdateUser.UserName = UserTrack_Object.UserName; 
        UpdateUser.UserEmail = UserTrack_Object.UserEmail;
        UpdateUser.DateTime = UserTrack_Object.DateTime;
        UpdateUser.ReferredStatus = UserTrack_Object.ReferredStatus;
        UpdateUser.isDuplicated = UserTrack_Object.isDuplicated;
        UpdateUser.SoftDelete = UserTrack_Object.SoftDelete;

        UpdateUser = await UpdateUser.save();
        res.send(UpdateUser);


    } catch (err) {
        res.status(500).send("Error: " + err);
    }
}

let DeleteUsers = async (req, res) => {
    const UserTrackModal_test = req.params.id;
    const DeleteUser = await UserTrackModal.findOne({ _id: UserTrackModal_test });
    try {
        if (DeleteUser) {
            const C = await DeleteUser.deleteOne();
            res.send(C);
        }
    } catch (Error) {
        res.send("Error: " + Error);
    }
}

let ReferUserToAdmin = async (req, res) => {
    const UserRefer_id = req.params.id;
    const foundUser = await UserTrackModal.findOne({ _id: UserRefer_id });
    // console.log(foundUser);
    //     res.send(foundUser);

    try {

        if (foundUser.isDuplicated != true) {
            
            foundUser.ReferredStatus = true;
    
            let C = await foundUser.save();
    
            res.send(C);
        }
        else {
            res.send("You Can not refer Duplicated Data");
        }


    } catch (Error) {
        res.send("Error: " + Error);
    }
}

let CreateDuplicate = async (req, res) => {
    const FoundUser = await UserTrackModal.find({ UserEmail: req.body.UserEmail, Calculator: req.body.Calculator });
    
    // console.log(" what the Hell = " + FoundUser.length );

    if (FoundUser.length < 6 && FoundUser.length != 0) {
    
        if (!req.body.isDuplicated) {
       
        // FoundUser[0].isDuplicated = false;

        // await FoundUser[0].save();

        let DuplicatedRow = {
            UserName: req.body.UserName,
            UserEmail: req.body.UserEmail,
            DateTime: req.body.DateTime,
            ReferredStatus: false,
            isDuplicated: true,
            SoftDelete: req.body.SoftDelete,
            Calculator: req.body.Calculator,
            Order: req.body.Order + (FoundUser.length / 10),
        }

        // console.log(DuplicatedRow);
        
        let UserTrack_store = new UserTrackModal(DuplicatedRow);
        UserTrack_store = await UserTrack_store.save();
        // res.send(UserTrack_store);

        return res.status(200).send({ message: "Duplicate User Complete", Data: UserTrack_store });
           
      }
    } else {
        return res.status(400).send({ message:"User not Found or allowed number of Duplication is 5" });
    }

}



router.get("/", GetAll);

router.post("/Add", PostUser);

router.post("/Duplicate", CreateDuplicate);

router.patch("/Update", UpdateUsers);

router.delete("/Delete/:id", DeleteUsers);

router.patch("/Refer/:id", ReferUserToAdmin);


module.exports = router;