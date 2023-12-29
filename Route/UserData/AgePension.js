const express = require('express');
const router = express.Router();

const UserAgePensionModel = require("../../Model/UserData/AgePension");
const UserAgePensionSchema = require("../../schema/UserData/AgePension");

let GetAll = async (req, res) => {
    const C = await UserAgePensionModel.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let GetOne = async (req, res) => {
    const C = await UserAgePensionModel.findOne({ UserEmail: req.params.email }).select('-__v');
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
}

let PostUser = async (req, res) => {
    const UserTrackModal_test = req.body;
    const { error } = UserAgePensionSchema(UserTrackModal_test);
    // if (error) return res.status(400).send(error.details[0].message);
    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {

        try {

            let UserTrack_store = new UserAgePensionModel(UserTrackModal_test);
            UserTrack_store = await UserTrack_store.save();
            res.send(UserTrack_store);


        } catch (error) {
            res.status(500).json({ "message": error.message });
        }
    }
}

let UpdateUserAgePensions = async (req, res) => {
    const UserTrack_Object = req.body;

    try {
        // Find the existing User by ID
        let UpdateUserAgePension = await UserAgePensionModel.findOne({ _id: UserTrack_Object._id });

        if (!UpdateUserAgePension) {
            return res.status(404).send({ message: "User not found" });
        }

        const { error } = UserAgePensionSchema(UserTrack_Object);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //! you must check Full schema for Updating in Other Tables

        UpdateUserAgePension.UserEmail = UserTrack_Object.UserEmail;
        UpdateUserAgePension.relationshipStatus = UserTrack_Object.relationshipStatus;
        UpdateUserAgePension.wifeDOB = UserTrack_Object.wifeDOB;
        UpdateUserAgePension.husbandDOB = UserTrack_Object.husbandDOB;
        UpdateUserAgePension.ownHome = UserTrack_Object.ownHome;
        UpdateUserAgePension.homeLoan = UserTrack_Object.homeLoan;
        UpdateUserAgePension.homeLoanAmount = UserTrack_Object.homeLoanAmount;
        UpdateUserAgePension.gift = UserTrack_Object.gift;
        UpdateUserAgePension.giftExtended = UserTrack_Object.giftExtended;
        UpdateUserAgePension.husbandCars = UserTrack_Object.husbandCars;
        UpdateUserAgePension.husbandHousehold = UserTrack_Object.husbandHousehold;
        UpdateUserAgePension.husbandBoat = UserTrack_Object.husbandBoat;
        UpdateUserAgePension.husbandCaravan = UserTrack_Object.husbandCaravan;
        UpdateUserAgePension.husbandOtherAssets = UserTrack_Object.husbandOtherAssets;
        UpdateUserAgePension.wifeCars = UserTrack_Object.wifeCars;
        UpdateUserAgePension.husbandSavingsAccounts = UserTrack_Object.husbandSavingsAccounts;
        UpdateUserAgePension.husbandSuperAnnaution = UserTrack_Object.husbandSuperAnnaution;
        UpdateUserAgePension.husbandPension = UserTrack_Object.husbandPension;
        UpdateUserAgePension.husbandPortfolio = UserTrack_Object.husbandPortfolio;
        UpdateUserAgePension.husbandFunds = UserTrack_Object.husbandFunds;
        UpdateUserAgePension.wifeSavingsAccounts = UserTrack_Object.wifeSavingsAccounts;
        UpdateUserAgePension.wifeSuperAnnaution = UserTrack_Object.wifeSuperAnnaution;
        UpdateUserAgePension.wifeFunds = UserTrack_Object.wifeFunds;
        UpdateUserAgePension.wifePortfolio = UserTrack_Object.wifePortfolio;
        UpdateUserAgePension.wifePension = UserTrack_Object.wifePension;
        UpdateUserAgePension.ownOtherProperty = UserTrack_Object.ownOtherProperty;
        UpdateUserAgePension.secondPropertyValue = UserTrack_Object.secondPropertyValue;
        UpdateUserAgePension.propertyLoan = UserTrack_Object.propertyLoan;
        UpdateUserAgePension.secondPropertyLoan = UserTrack_Object.secondPropertyLoan;
        UpdateUserAgePension.rentOptions = UserTrack_Object.rentOptions;
        UpdateUserAgePension.secondPropertyRentFrequency = UserTrack_Object.secondPropertyRentFrequency;
        UpdateUserAgePension.secondPropertyRentalIncome = UserTrack_Object.secondPropertyRentalIncome;
        UpdateUserAgePension.secondPropertyAnnualExpense = UserTrack_Object.secondPropertyAnnualExpense;
        UpdateUserAgePension.gFatherIncomeStream = UserTrack_Object.gFatherIncomeStream;
        UpdateUserAgePension.gFatherCurrentAccountValue = UserTrack_Object.gFatherCurrentAccountValue;
        UpdateUserAgePension.gFatherAnnualPension = UserTrack_Object.gFatherAnnualPension;
        UpdateUserAgePension.gFatherAnnualDeductible = UserTrack_Object.gFatherAnnualDeductible;
        UpdateUserAgePension.wifeGFatherCurrentAccountValue = UserTrack_Object.wifeGFatherCurrentAccountValue;
        UpdateUserAgePension.gFatherAnnualPensionWife = UserTrack_Object.gFatherAnnualPensionWife;
        UpdateUserAgePension.gFatherAnnualDeductibleWife = UserTrack_Object.gFatherAnnualDeductibleWife;
        UpdateUserAgePension.yourOtherIncomeStream = UserTrack_Object.yourOtherIncomeStream;
        UpdateUserAgePension.yourAnnualPension = UserTrack_Object.yourAnnualPension;
        UpdateUserAgePension.yourAnnualDeductible = UserTrack_Object.yourAnnualDeductible;
        UpdateUserAgePension.yourAnnualPensionWife = UserTrack_Object.yourAnnualPensionWife;
        UpdateUserAgePension.yourAnnualDeductibleWife = UserTrack_Object.yourAnnualDeductibleWife;
        UpdateUserAgePension.workingIncome = UserTrack_Object.workingIncome;
        UpdateUserAgePension.grossSalary = UserTrack_Object.grossSalary;
        UpdateUserAgePension.grossSalaryWife = UserTrack_Object.grossSalaryWife;
        UpdateUserAgePension.otherIncomeOptions = UserTrack_Object.otherIncomeOptions;
        UpdateUserAgePension.overseasIncome = UserTrack_Object.overseasIncome;
        UpdateUserAgePension.overseasIncomeWife = UserTrack_Object.overseasIncomeWife;
        UpdateUserAgePension.businessIncomeOptions = UserTrack_Object.businessIncomeOptions;
        UpdateUserAgePension.netAssets = UserTrack_Object.netAssets;
        UpdateUserAgePension.netProfit = UserTrack_Object.netProfit;
        UpdateUserAgePension.netAssetsWife = UserTrack_Object.netAssetsWife;
        UpdateUserAgePension.netProfitWife = UserTrack_Object.netProfitWife;
        UpdateUserAgePension.fortnight = UserTrack_Object.fortnight;
        UpdateUserAgePension.fortnightAnnual = UserTrack_Object.fortnightAnnual;
        UpdateUserAgePension.ALower = UserTrack_Object.ALower;
        UpdateUserAgePension.AHigher = UserTrack_Object.AHigher;
        UpdateUserAgePension.AAssessable = UserTrack_Object.AAssessable;
        UpdateUserAgePension.AExcess = UserTrack_Object.AExcess;
        UpdateUserAgePension.ILower = UserTrack_Object.ILower;
        UpdateUserAgePension.IHigher = UserTrack_Object.IHigher;
        UpdateUserAgePension.IAssessable = UserTrack_Object.IAssessable;
        UpdateUserAgePension.IExcess = UserTrack_Object.IExcess;
  

        UpdateUserAgePension = await UpdateUserAgePension.save();
        res.send(UpdateUserAgePension);


    } catch (err) {
        res.status(500).send("Error: " + err);
    }
}

let DeleteUsers = async (req, res) => {
    const UserTrackModal_test = req.params.id;
    const DeleteUser = UserAgePensionModel.findOne({ _id: UserTrackModal_test });
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

router.patch("/Update", UpdateUserAgePensions);

router.delete("/Delete/:id", DeleteUsers);



module.exports = router;