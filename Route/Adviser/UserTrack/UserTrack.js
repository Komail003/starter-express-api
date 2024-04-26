const express = require("express");
const router = express.Router();
const UserLIHCModel = require("../../../Model/UserData/LIHC");
const UserCSHCModel = require("../../../Model/UserData/CSHC");
const UserAgePensionModel = require("../../../Model/UserData/AgePension");

const UserTrackModal = require("../../../Model/UserTrack/UserTrack");
const UserTrackSchema = require("../../../schema/UserTrack/UserTrack");
const adviserModal = require("../../../Model/Adviser/Adviser");
const assignToMail = require("../../Mailer/assignToMail");

let GetAll = async (req, res) => {
  // console.log("Adviser_FK: ", req.params.Adviser_FK);
  // const C = await UserTrackModal.find({Adviser_FK:req.params.Adviser_FK});

  const C = await UserTrackModal.find({
    Adviser_FK: req.params.Adviser_FK,
  }).sort({ Order: 1 });
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
};

let getUserById = async (req, res) => {
  const user = await UserTrackModal.findOne({ _id: req.params.userID });

  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    res.send(user);
  } catch (err) {
    res.send("Error: " + err);
  }
};

router.get("/refer", async (req, res) => {
  const C = await UserTrackModal.find({ ReferredStatus: true });
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

let PostUser = async (req, res) => {
  const UserTrackModal_test = req.body;
  const { error } = UserTrackSchema(UserTrackModal_test);
  // if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } else {
    try {
      const C = await UserTrackModal.find({ isDuplicated: false });
      UserTrackModal_test.Order = C.length + 1;

      let UserTrack_store = new UserTrackModal(UserTrackModal_test);
      UserTrack_store = await UserTrack_store.save();
      res.send(UserTrack_store);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

let UpdateUsers = async (req, res) => {
  const UserTrack_Object = req.body;

  try {
    // Find the existing User by ID
    let UpdateUser = await UserTrackModal.findOne({
      _id: UserTrack_Object._id,
    });

    if (!UpdateUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const { error } = UserTrackSchema(UserTrack_Object);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    //! you must check Full schema for Updating in Other Tables

    UpdateUser.isNotified = false;

    UpdateUser = await UpdateUser.save();
    res.send(UpdateUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
let DeleteUsers = async (req, res) => {
  try {
    const UserTrackModal_test = req.params.id;
    const deleteResult = await UserTrackModal.findByIdAndDelete(
      UserTrackModal_test
    );

    if (!deleteResult) {
      return res.status(404).send("User not found");
    }

    const deletedUser = deleteResult.toJSON();
    const userEmail = deletedUser.clientEmail;

    const listOfDuplicatedUser = await UserTrackModal.find({
      clientEmail: userEmail,
      Calculator: deletedUser.Calculator,
      _id: { $ne: deletedUser._id }, // Exclude the deleted user from the list
    });

    // Update the order of the remaining objects
    for (let i = 1; i < listOfDuplicatedUser.length; i++) {
      const newUserOrder = listOfDuplicatedUser[0].Order + i / 10;
      await UserTrackModal.findByIdAndUpdate(listOfDuplicatedUser[i]._id, {
        Order: newUserOrder,
      });
    }

    res.send("User deleted and order updated successfully");
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
};

let ReferUserToAdmin = async (req, res) => {
  const UserRefer_id = req.params.id;
  const foundUser = await UserTrackModal.findOne({ _id: UserRefer_id });
  const foundAdviser = await adviserModal.findOne({
    _id: foundUser.Adviser_FK,
  });
  // // console.log(foundUser);
  //     res.send(foundUser);
  foundUser.adviserName = foundAdviser.adviserName;
  foundUser.CompanyName = foundAdviser.CompanyName;
  foundUser.CompanyEmail = foundAdviser.CompanyEmail;
  foundUser.CompanyPhone = foundAdviser.CompanyPhone;

  try {
    if (foundUser.isDuplicated != true) {
      foundUser.ReferredStatus = true;
      foundUser.isNotified = true;

      let C = await foundUser.save();

      res.send(C);
      // res.send(foundUser)
      C.adviserName = foundAdviser.adviserName;
      C.CompanyName = foundAdviser.CompanyName;
      C.CompanyEmail = foundAdviser.CompanyEmail;
      C.CompanyPhone = foundAdviser.CompanyPhone;

      assignToMail(C);
    } else {
      res.send("You Can not refer Duplicated Data");
    }
  } catch (Error) {
    res.send("Error: " + Error);
  }
};

let CreateDuplicate = async (req, res) => {
  let duplicatedData = req.body;

  console.log("duplicatedData ", duplicatedData);
  const FoundUser = await UserTrackModal.find({
    clientEmail: req.body.clientEmail,
    Calculator: req.body.Calculator,
  });

  if (FoundUser.length === 0) {
    return res.status(404).send("User not found");
  }

  //  console.log("FoundUser",FoundUser)

  let FoundUserID = FoundUser[0]._id;

  // console.log(" FoundUser " + FoundUserID);

  console.log(" what the Hell = " + FoundUser.length);

  if (FoundUser.length < 6 && FoundUser.length != 0) {
    if (!req.body.isDuplicated) {
      // FoundUser[0].isDuplicated = false;

      // await FoundUser[0].save();

      let DuplicatedRow = {
        // _id: res.data._id,
        relationshipStatus: duplicatedData.relationshipStatus,
        Scenario: duplicatedData.Scenario,
        selectedCalculator: duplicatedData.selectedCalculator,

        clientPreferredName: duplicatedData.clientPreferredName + " (Copy) ",
        clientFirstName: duplicatedData.clientFirstName,
        clientSurname: duplicatedData.clientSurname,
        clientEmail: duplicatedData.clientEmail,
        clientPhone: duplicatedData.clientPhone,
        clientDOB: duplicatedData.clientDOB,

        partnerFirstName: duplicatedData.partnerFirstName + " (Copy) ",
        partnerPreferredName: duplicatedData.partnerPreferredName,
        partnerSurname: duplicatedData.partnerSurname,
        partnerDOB: duplicatedData.partnerDOB,
        partnerEmail: duplicatedData.partnerEmail,
        partnerPhone: duplicatedData.partnerPhone,

        DateTime: duplicatedData.DateTime,
        ReferredStatus: false,
        isDuplicated: true,
        SoftDelete: duplicatedData.SoftDelete,
        Calculator: duplicatedData.Calculator,
        Adviser_FK: duplicatedData.Adviser_FK,

        Order: duplicatedData.Order + FoundUser.length / 10,
      };

      // console.log(DuplicatedRow);

      let UserTrack_store = new UserTrackModal(DuplicatedRow);
      UserTrack_store = await UserTrack_store.save();

      let UserTrack_storeID = UserTrack_store._id;
      let calculatorName = UserTrack_store.Calculator;

      // console.log("UserTrack_storeID :", UserTrack_storeID);
      // console.log("calculatorName :", calculatorName);

      if (calculatorName == "LIHC") {
        // console.log("LIHC", FoundUserID);
        // const AddUserLIHC_OBJ = await UserLIHCModel.find({
        //   UserTracking_FK: FoundUser[0]._id,
        // }).populate({ path: "UserTracking_FK" });
        const AddUserLIHC_OBJ = await UserLIHCModel.find({
          UserTracking_FK: FoundUserID,
        });

        let newLIHC = AddUserLIHC_OBJ[0];

        let calOBJ = {
          UserEmail: newLIHC.UserEmail,
          relationshipStatus: newLIHC.relationshipStatus,
          wifeDOB: newLIHC.wifeDOB,
          husbandDOB: newLIHC.husbandDOB,
          gift: newLIHC.gift,
          UserTracking_FK: UserTrack_storeID,
          businessIncomeOptions: newLIHC.businessIncomeOptions,
          benefits: newLIHC.benefits,
          centreLinkBenefits: newLIHC.centreLinkBenefits,
          centreLinkBenefitsWife: newLIHC.centreLinkBenefitsWife,
          husbandSavingsAccounts: newLIHC.husbandSavingsAccounts,
          wifeSavingsAccounts: newLIHC.wifeSavingsAccounts,
          husbandSuperAnnaution: newLIHC.husbandSuperAnnaution,
          wifeSuperAnnaution: newLIHC.wifeSuperAnnaution,
          husbandPension: newLIHC.husbandPension,
          wifePension: newLIHC.wifePension,
          husbandPortfolio: newLIHC.husbandPortfolio,
          wifePortfolio: newLIHC.wifePortfolio,
          husbandFunds: newLIHC.husbandFunds,
          wifeFunds: newLIHC.wifeFunds,
          rentOptions: newLIHC.rentOptions,
          rentFrequency: newLIHC.rentFrequency,
          secondPropertyRentalIncome: newLIHC.secondPropertyRentalIncome,
          secondPropertyAnnualExpense: newLIHC.secondPropertyAnnualExpense,
          yourOtherIncomeStream: newLIHC.yourOtherIncomeStream,
          yourAnnualPension: newLIHC.yourAnnualPension,
          yourAnnualPensionWife: newLIHC.yourAnnualPensionWife,
          yourAnnualDeductible: newLIHC.yourAnnualDeductible,
          yourAnnualDeductibleWife: newLIHC.yourAnnualDeductibleWife,
          grossSalary: newLIHC.grossSalary,
          grossSalaryWife: newLIHC.grossSalaryWife,
          workingIncome: newLIHC.workingIncome,
          otherIncomeOptions: newLIHC.otherIncomeOptions,
          overseasIncome: newLIHC.overseasIncome,
          overseasIncomeWife: newLIHC.overseasIncomeWife,
          totalIncome1: newLIHC.totalIncome1,
          incomeThreshold1: newLIHC.incomeThreshold1,
        };

        // newLIHC.UserTracking_FK = UserTrack_storeID;

        // console.log("AddUserLIHC_OBJ abc", calOBJ);

        let UserTrack_store = new UserLIHCModel(calOBJ);
        UserTrack_store = await UserTrack_store.save();

        // // console.log("AddUserLIHC_OBJ Sava k bad =", UserTrack_store);
        // // console.log("id is this ", UserTrack_storeID);

        return res
          .status(200)
          .send({ message: "Duplicate User Complete", id: UserTrack_storeID });
      } else if (calculatorName == "CSHC") {
        // console.log("CSHC", FoundUserID);
        // const AddUserCSHC_OBJ = await UserCSHCModel.find({
        //   UserTracking_FK: FoundUser[0]._id,
        // }).populate({ path: "UserTracking_FK" });
        const AddUserCSHC_OBJ = await UserCSHCModel.find({
          UserTracking_FK: FoundUserID,
        });

        let newCSHC = AddUserCSHC_OBJ[0];

        let calOBJ = {
          UserEmail: newCSHC.UserEmail,
          relationshipStatus: newCSHC.relationshipStatus,
          wifeDOB: newCSHC.wifeDOB,
          husbandDOB: newCSHC.husbandDOB,
          husbandDividendIncome: newCSHC.husbandDividendIncome,
          wifeDividendIncome: newCSHC.wifeDividendIncome,
          husbandFunds: newCSHC.husbandFunds,
          wifeFunds: newCSHC.wifeFunds,
          husbandInterest: newCSHC.husbandInterest,
          wifeInterest: newCSHC.wifeInterest,
          UserTracking_FK: UserTrack_storeID,
          rentOptions: newCSHC.rentOptions,
          rentFrequency: newCSHC.rentFrequency,
          secondPropertyRentalIncome: newCSHC.secondPropertyRentalIncome,
          secondPropertyAnnualExpense: newCSHC.secondPropertyAnnualExpense,
          yourOtherIncomeStream: newCSHC.yourOtherIncomeStream,
          yourAnnualPension: newCSHC.yourAnnualPension,
          yourAnnualPensionWife: newCSHC.yourAnnualPensionWife,
          workingIncome: newCSHC.workingIncome,
          grossSalary: newCSHC.grossSalary,
          grossSalaryWife: newCSHC.grossSalaryWife,
          otherIncomeOptions: newCSHC.otherIncomeOptions,
          overseasIncome: newCSHC.overseasIncome,
          overseasIncomeWife: newCSHC.overseasIncomeWife,
          accountBasedPensionOptions: newCSHC.accountBasedPensionOptions,
          husbandPensionAccountBased: newCSHC.husbandPensionAccountBased,
          wifePensionAccountBased: newCSHC.wifePensionAccountBased,
        };

        // newCSHC.UserTracking_FK = UserTrack_storeID;

        // console.log("AddUserCSHC_OBJ abc", calOBJ);

        let UserTrack_store = new UserCSHCModel(calOBJ);
        UserTrack_store = await UserTrack_store.save();

        // console.log("AddUserCSHC_OBJ Sava k bad =", UserTrack_store);
        // console.log("id is this ", UserTrack_storeID);

        return res
          .status(200)
          .send({ message: "Duplicate User Complete", id: UserTrack_storeID });
      } else if (calculatorName == "Age-Pension") {
        // console.log("Age-Pension", FoundUserID);
        // const AddUserAge-Pension_OBJ = await UserAge-PensionModel.find({
        //   UserTracking_FK: FoundUser[0]._id,
        // }).populate({ path: "UserTracking_FK" });
        const AddUserAgePension_OBJ = await UserAgePensionModel.find({
          UserTracking_FK: FoundUserID,
        });

        let newAgePension = AddUserAgePension_OBJ[0];

        let calOBJ = {
          UserEmail: newAgePension.UserEmail,
          UserTracking_FK: UserTrack_storeID,
          relationshipStatus: newAgePension.relationshipStatus,
          wifeDOB: newAgePension.wifeDOB,
          husbandDOB: newAgePension.husbandDOB,
          home: newAgePension.home,
          homeloan: newAgePension.homeloan,
          homeLoan: newAgePension.homeLoan,
          gift: newAgePension.gift,
          // giftExtended: newAgePension.giftExtended,
          husbandInvestmentLoan: newAgePension.husbandInvestmentLoan,
          wifeInvestmentLoan: newAgePension.wifeInvestmentLoan,
          husbandCars: newAgePension.husbandCars,
          husbandHousehold: newAgePension.husbandHousehold,
          husbandBoat: newAgePension.husbandBoat,
          husbandCaravan: newAgePension.husbandCaravan,
          husbandOtherAssets: newAgePension.husbandOtherAssets,
          wifeCars: newAgePension.wifeCars,
          husbandSavingsAccounts: newAgePension.husbandSavingsAccounts,
          husbandSuperAnnaution: newAgePension.husbandSuperAnnaution,
          husbandPension: newAgePension.husbandPension,
          husbandPortfolio: newAgePension.husbandPortfolio,
          husbandFunds: newAgePension.husbandFunds,
          wifeSavingsAccounts: newAgePension.wifeSavingsAccounts,
          wifeSuperAnnaution: newAgePension.wifeSuperAnnaution,
          wifeFunds: newAgePension.wifeFunds,
          wifePortfolio: newAgePension.wifePortfolio,
          wifePension: newAgePension.wifePension,
          ownOtherProperty: newAgePension.ownOtherProperty,
          secondPropertyValue: newAgePension.secondPropertyValue,
          propertyLoan: newAgePension.propertyLoan,
          secondPropertyLoan: newAgePension.secondPropertyLoan,
          rentOptions: newAgePension.rentOptions,
          secondPropertyRentFrequency:
            newAgePension.secondPropertyRentFrequency,
          secondPropertyRentalIncome: newAgePension.secondPropertyRentalIncome,
          secondPropertyAnnualExpense:
            newAgePension.secondPropertyAnnualExpense,
          gFatherIncomeStream: newAgePension.gFatherIncomeStream,
          gFatherCurrentAccountValue: newAgePension.gFatherCurrentAccountValue,
          gFatherAnnualPension: newAgePension.gFatherAnnualPension,
          gFatherAnnualDeductible: newAgePension.gFatherAnnualDeductible,
          wifeGFatherCurrentAccountValue:
            newAgePension.wifeGFatherCurrentAccountValue,
          gFatherAnnualPensionWife: newAgePension.gFatherAnnualPensionWife,
          gFatherAnnualDeductibleWife:
            newAgePension.gFatherAnnualDeductibleWife,
          yourOtherIncomeStream: newAgePension.yourOtherIncomeStream,
          yourAnnualPension: newAgePension.yourAnnualPension,
          yourAnnualDeductible: newAgePension.yourAnnualDeductible,
          yourAnnualPensionWife: newAgePension.yourAnnualPensionWife,
          yourAnnualDeductibleWife: newAgePension.yourAnnualDeductibleWife,
          workingIncome: newAgePension.workingIncome,
          grossSalary: newAgePension.grossSalary,
          grossSalaryWife: newAgePension.grossSalaryWife,
          otherIncomeOptions: newAgePension.otherIncomeOptions,
          overseasIncome: newAgePension.overseasIncome,
          overseasIncomeWife: newAgePension.overseasIncomeWife,
          businessIncomeOptions: newAgePension.businessIncomeOptions,
          netAssets: newAgePension.netAssets,
          netProfit: newAgePension.netProfit,
          netAssetsWife: newAgePension.netAssetsWife,
          netProfitWife: newAgePension.netProfitWife,
          loanOnFunds: newAgePension.loanOnFunds,
        };

        // newAgePension.UserTracking_FK = UserTrack_storeID;

        // console.log("AddUserAgePension_OBJ abc", calOBJ);

        let UserTrack_store = new UserAgePensionModel(calOBJ);
        UserTrack_store = await UserTrack_store.save();

        // // console.log("AddUserAgePension_OBJ Sava k bad =", UserTrack_store);
        // // console.log("id is this ", UserTrack_storeID);

        return res
          .status(200)
          .send({ message: "Duplicate User Complete", id: UserTrack_storeID });
      }

      // res.send(UserTrack_store);
    }
  } else {
    return res.status(400).send({
      message: "User not Found or allowed number of Duplication is 5",
    });
  }
};

let singleNotification = async (req, res) => {
  // console.log("req.body", req.body);
  const clientID = req.body._id;
  const foundUser = await UserTrackModal.findOne({ _id: clientID });
  if (!foundUser) return res.status(404).send("client Not Found");
  try {
    foundUser.isNotified = false;
    let C = await foundUser.save();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
};

let allNotifications = async (req, res) => {
  try {
    const foundUsers = await UserTrackModal.find({ isNotified: true });

    // console.log("foundUsers", foundUsers);

    if (!foundUsers || foundUsers.length === 0) {
      return res.status(404).send("Clients Not Found");
    }

    const updatePromises = foundUsers.map(async (foundUser) => {
      foundUser.isNotified = false;
      return foundUser.save();
    });

    const updatedUsers = await Promise.all(updatePromises);

    res.send(updatedUsers);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

let updateClient = async (req, res) => {
  const existingId = req.body._id;
  const updatedData = req.body;
  // console.log("updatedData", updatedData);
  // // console.log("existingId", existingId);
  try {
    // Fetch the existing document from the database
    const existingClient = await UserTrackModal.findOne({ _id: req.body._id });

    if (!existingClient) {
      return res.status(404).send("Client not found");
    }

    if (updatedData.relationshipStatus == "Single") {
      existingClient.partnerFirstName = undefined;
      existingClient.partnerSurname = undefined;
      existingClient.partnerPreferredName = undefined;
      existingClient.partnerDOB = undefined;
      existingClient.partnerEmail = undefined;
      existingClient.partnerPhone = undefined;

      existingClient.clientFirstName = updatedData.clientFirstName;
      existingClient.clientSurname = updatedData.clientSurname;
      existingClient.clientPreferredName = updatedData.clientPreferredName;
      existingClient.clientDOB = updatedData.clientDOB;
      existingClient.clientEmail = updatedData.clientEmail;
      existingClient.clientPhone = updatedData.clientPhone;
      existingClient.relationshipStatus = updatedData.relationshipStatus;
    } else {
      existingClient.partnerFirstName = updatedData.partnerFirstName;
      existingClient.partnerSurname = updatedData.partnerSurname;
      existingClient.partnerPreferredName = updatedData.partnerPreferredName;
      existingClient.partnerDOB = updatedData.partnerDOB;
      existingClient.partnerEmail = updatedData.partnerEmail;
      existingClient.partnerPhone = updatedData.partnerPhone;

      existingClient.clientFirstName = updatedData.clientFirstName;
      existingClient.clientSurname = updatedData.clientSurname;
      existingClient.clientPreferredName = updatedData.clientPreferredName;
      existingClient.clientDOB = updatedData.clientDOB;
      existingClient.clientEmail = updatedData.clientEmail;
      existingClient.clientPhone = updatedData.clientPhone;
      existingClient.relationshipStatus = updatedData.relationshipStatus;
    }

    // delete updatedData._id;
    // // Validate the updated data against the schema
    // const { error } = ClientSchema(updatedData);

    // if (error) {
    //   return res.status(400).send({ message: error.details[0].message });
    // }

    // Update the existing Client document
    // Object.assign(existingClient, updatedData);

    // Save the updated document back to the database
    const updatedClient = await existingClient.save();
    // // console.log("updatedClient",updatedClient)
    res.send(updatedClient);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};

router.get("/:Adviser_FK", GetAll);
router.get("/getUser/:userID", getUserById);
router.post("/Add", PostUser);
router.post("/Duplicate", CreateDuplicate);
router.patch("/Update", UpdateUsers);
router.patch("/updateClient", updateClient);
router.delete("/Delete/:id", DeleteUsers);
router.patch("/Refer/:id", ReferUserToAdmin);
router.patch("/singleNotification", singleNotification);
router.patch("/allNotifications", allNotifications);

module.exports = router;