const express = require('express');
const router = express.Router();

const UserLIHCModel = require("../../Model/UserData/LIHC");
const UserLIHCSchema = require("../../schema/UserData/LIHC");

let GetAll = async (req, res) => {
    const C = await UserLIHCModel.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let GetOne = async (req, res) => {
    const C = await UserLIHCModel.findOne({ UserEmail: req.params.email }).select('-__v');
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}
  
let PostUser = async (req, res) => {
    const UserTrackModal_test = req.body;
    const { error } = UserLIHCSchema(UserTrackModal_test);
    // if (error) return res.status(400).send(error.details[0].message);
    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {

        try {

            let UserTrack_store = new UserLIHCModel(UserTrackModal_test);
            UserTrack_store = await UserTrack_store.save();
            res.send(UserTrack_store);


        } catch (error) {
            res.status(500).json({ "message": error.message });
        }
    }
}

let UpdateUserLIHC = async (req, res) => {
    const UserTrack_Object = req.body;

    try {
        // Find the existing User by ID
        let UpdateUserLIHC = await UserLIHCModel.findOne({ _id: UserTrack_Object._id });

        if (!UpdateUserLIHC) {
            return res.status(404).send({ message: "User not found" });
        }

        const { error } = UserLIHCSchema(UserTrack_Object);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //! you must check Full schema for Updating in Other Tables

        UpdateUserLIHC.UserEmail = UserTrack_Object.UserEmail;
        UpdateUserLIHC.relationshipStatus = UserTrack_Object.relationshipStatus;
        UpdateUserLIHC.wifeDOB = UserTrack_Object.wifeDOB;
        UpdateUserLIHC.husbandDOB = UserTrack_Object.husbandDOB;
        UpdateUserLIHC.gift = UserTrack_Object.gift;
        UpdateUserLIHC.giftExtended = UserTrack_Object.giftExtended;
        UpdateUserLIHC.businessIncomeOptions = UserTrack_Object.businessIncomeOptions;
        UpdateUserLIHC.benefits = UserTrack_Object.benefits;
        UpdateUserLIHC.centreLinkBenefits = UserTrack_Object.centreLinkBenefits;
        UpdateUserLIHC.centreLinkBenefitsWife = UserTrack_Object.centreLinkBenefitsWife;
        UpdateUserLIHC.husbandSavingsAccounts = UserTrack_Object.husbandSavingsAccounts;
        UpdateUserLIHC.wifeSavingsAccounts = UserTrack_Object.wifeSavingsAccounts;
        UpdateUserLIHC.husbandSuperAnnaution = UserTrack_Object.husbandSuperAnnaution;
        UpdateUserLIHC.wifeSuperAnnaution = UserTrack_Object.wifeSuperAnnaution;
        UpdateUserLIHC.husbandPension = UserTrack_Object.husbandPension;
        UpdateUserLIHC.wifePension = UserTrack_Object.wifePension;
        UpdateUserLIHC.husbandPortfolio = UserTrack_Object.husbandPortfolio;
        UpdateUserLIHC.wifePortfolio = UserTrack_Object.wifePortfolio;
        UpdateUserLIHC.husbandFunds = UserTrack_Object.husbandFunds;
        UpdateUserLIHC.wifeFunds = UserTrack_Object.wifeFunds;
        UpdateUserLIHC.rentOptions = UserTrack_Object.rentOptions;
        UpdateUserLIHC.rentFrequency = UserTrack_Object.rentFrequency;
        UpdateUserLIHC.secondPropertyRentalIncome = UserTrack_Object.secondPropertyRentalIncome;
        UpdateUserLIHC.secondPropertyAnnualExpense = UserTrack_Object.secondPropertyAnnualExpense;
        UpdateUserLIHC.yourOtherIncomeStream = UserTrack_Object.yourOtherIncomeStream;
        UpdateUserLIHC.yourAnnualPension = UserTrack_Object.yourAnnualPension;
        UpdateUserLIHC.yourAnnualPensionWife = UserTrack_Object.yourAnnualPensionWife;
        UpdateUserLIHC.yourAnnualDeductible = UserTrack_Object.yourAnnualDeductible;
        UpdateUserLIHC.yourAnnualDeductibleWife = UserTrack_Object.yourAnnualDeductibleWife;
        UpdateUserLIHC.grossSalary = UserTrack_Object.grossSalary;
        UpdateUserLIHC.grossSalaryWife = UserTrack_Object.grossSalaryWife;
        UpdateUserLIHC.workingIncome = UserTrack_Object.workingIncome;
        UpdateUserLIHC.otherIncomeOptions = UserTrack_Object.otherIncomeOptions;
        UpdateUserLIHC.overseasIncome = UserTrack_Object.overseasIncome;
        UpdateUserLIHC.overseasIncomeWife = UserTrack_Object.overseasIncomeWife;
        UpdateUserLIHC.totalIncome1 = UserTrack_Object.totalIncome1;
        UpdateUserLIHC.incomeThreshold1 = UserTrack_Object.incomeThreshold1;

        UpdateUserLIHC = await UpdateUserLIHC.save();
        res.send(UpdateUserLIHC);


    } catch (err) {
        res.status(500).send("Error: " + err);
    }
}

let DeleteUsers = async (req, res) => {
    const UserTrackModal_test = req.params.id;
    const DeleteUser = UserLIHCModel.findOne({ _id: UserTrackModal_test });
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

router.patch("/Update", UpdateUserLIHC);

router.delete("/Delete/:id", DeleteUsers);



module.exports = router;