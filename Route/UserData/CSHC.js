const express = require('express');
const router = express.Router();

const UserCSHCModel = require("../../Model/UserData/CSHC");
const UserCSHCSchema = require("../../schema/UserData/CSHC");

let GetAll = async (req, res) => {
    const C = await UserCSHCModel.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let GetOne = async (req, res) => {
    const C = await UserCSHCModel.findOne({ UserEmail: req.params.email }).select('-__v');
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let PostUser = async (req, res) => {
    const UserTrackModal_test = req.body;
    const { error } = UserCSHCSchema(UserTrackModal_test);
    // if (error) return res.status(400).send(error.details[0].message);
    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {

        try {

            let UserTrack_store = new UserCSHCModel(UserTrackModal_test);
            UserTrack_store = await UserTrack_store.save();
            res.send(UserTrack_store);


        } catch (error) {
            res.status(500).json({ "message": error.message });
        }
    }
}

let UpdateUserCSHC = async (req, res) => {
    const UserTrack_Object = req.body;

    try {
        // Find the existing User by ID
        let UpdateUserCSHC = await UserCSHCModel.findOne({ _id: UserTrack_Object._id });

        if (!UpdateUserCSHC) {
            return res.status(404).send({ message: "User not found" });
        }

        const { error } = UserCSHCSchema(UserTrack_Object);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //! you must check Full schema for Updating in Other Tables

        UpdateUserCSHC.UserEmail = UserTrack_Object.UserEmail;
        UpdateUserCSHC.relationshipStatus = UserTrack_Object.relationshipStatus;
        UpdateUserCSHC.wifeDOB = UserTrack_Object.wifeDOB;
        UpdateUserCSHC.husbandDOB = UserTrack_Object.husbandDOB;
        UpdateUserCSHC.husbandDividendIncome = UserTrack_Object.husbandDividendIncome;
        UpdateUserCSHC.wifeDividendIncome = UserTrack_Object.wifeDividendIncome;
        UpdateUserCSHC.husbandFunds = UserTrack_Object.husbandFunds;
        UpdateUserCSHC.wifeFunds = UserTrack_Object.wifeFunds;
        UpdateUserCSHC.husbandInterest = UserTrack_Object.husbandInterest;
        UpdateUserCSHC.wifeInterest = UserTrack_Object.wifeInterest;
        UpdateUserCSHC.rentOptions = UserTrack_Object.rentOptions;
        UpdateUserCSHC.rentFrequency = UserTrack_Object.rentFrequency;
        UpdateUserCSHC.secondPropertyRentalIncome = UserTrack_Object.secondPropertyRentalIncome;
        UpdateUserCSHC.secondPropertyAnnualExpense = UserTrack_Object.secondPropertyAnnualExpense;
        UpdateUserCSHC.yourOtherIncomeStream = UserTrack_Object.yourOtherIncomeStream;
        UpdateUserCSHC.yourAnnualPension = UserTrack_Object.yourAnnualPension;
        UpdateUserCSHC.yourAnnualPensionWife = UserTrack_Object.yourAnnualPensionWife;
        UpdateUserCSHC.workingIncome = UserTrack_Object.workingIncome;
        UpdateUserCSHC.grossSalary = UserTrack_Object.grossSalary;
        UpdateUserCSHC.grossSalaryWife = UserTrack_Object.grossSalaryWife;
        UpdateUserCSHC.otherIncomeOptions = UserTrack_Object.otherIncomeOptions;
        UpdateUserCSHC.overseasIncome = UserTrack_Object.overseasIncome;
        UpdateUserCSHC.overseasIncomeWife = UserTrack_Object.overseasIncomeWife;
        UpdateUserCSHC.yourAnnualPensionWife = UserTrack_Object.yourAnnualPensionWife;
        UpdateUserCSHC.accountBasedPensionOptions = UserTrack_Object.accountBasedPensionOptions;
        UpdateUserCSHC.husbandPensionAccountBased = UserTrack_Object.husbandPensionAccountBased;
        UpdateUserCSHC.wifePensionAccountBased = UserTrack_Object.wifePensionAccountBased;
        UpdateUserCSHC.totalIncome = UserTrack_Object.totalIncome;
        UpdateUserCSHC.threshold = UserTrack_Object.threshold;
        
        UpdateUserCSHC = await UpdateUserCSHC.save();
        res.send(UpdateUserCSHC);


    } catch (err) {
        res.status(500).send("Error: " + err);
    }
}

let DeleteUsers = async (req, res) => {
    const UserTrackModal_test = req.params.id;
    const DeleteUser = UserCSHCModel.findOne({ _id: UserTrackModal_test });
    try {
        const C = await DeleteUser.deleteOne();
        res.send(C);
    } catch (Error) {
        res.send("Error: " + Error);
    }
}

router.get("/", GetAll);

router.get("/GetOne/:email", GetOne);

router.post("/Add", PostUser);

router.patch("/Update", UpdateUserCSHC);

router.delete("/Delete/:id", DeleteUsers);

module.exports = router;