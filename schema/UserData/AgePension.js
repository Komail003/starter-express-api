const Joi = require("joi");

const UserData_AgePension_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    UserEmail: Joi.string().email({ tlds: { allow: false } }),
    UserTracking_FK: Joi.object(),

    relationshipStatus: Joi.string(),
    wifeDOB: Joi.date(),
    husbandDOB: Joi.date(),
    home: Joi.boolean(),
    homeloan: Joi.boolean(),
    homeLoan: Joi.number(),
    gift: Joi.boolean(),
    giftExtended: Joi.number(),
    husbandInvestmentLoan: Joi.number(),
    wifeInvestmentLoan: Joi.number(),
    husbandCars: Joi.number(),
    husbandHousehold: Joi.number(),
    husbandBoat: Joi.number(),
    husbandCaravan: Joi.number(),
    husbandOtherAssets: Joi.number(),
    wifeCars: Joi.number(),
    husbandSavingsAccounts: Joi.number(),
    husbandSuperAnnaution: Joi.number(),
    husbandPension: Joi.number(),
    husbandPortfolio: Joi.number(),
    husbandFunds: Joi.number(),
    wifeSavingsAccounts: Joi.number(),
    wifeSuperAnnaution: Joi.number(),
    wifeFunds: Joi.number(),
    wifePortfolio: Joi.number(),
    wifePension: Joi.number(),
    ownOtherProperty: Joi.boolean(),
    secondPropertyValue: Joi.number(),
    propertyLoan: Joi.boolean(),
    secondPropertyLoan: Joi.number(),
    rentOptions: Joi.boolean(),
    secondPropertyRentFrequency: Joi.string(),
    secondPropertyRentalIncome: Joi.number(),
    secondPropertyAnnualExpense: Joi.number(),
    gFatherIncomeStream: Joi.boolean(),
    gFatherCurrentAccountValue: Joi.number(),
    gFatherAnnualPension: Joi.number(),
    gFatherAnnualDeductible: Joi.number(),
    wifeGFatherCurrentAccountValue: Joi.number(),
    gFatherAnnualPensionWife: Joi.number(),
    gFatherAnnualDeductibleWife: Joi.number(),
    yourOtherIncomeStream: Joi.boolean(),
    yourAnnualPension: Joi.number(),
    yourAnnualDeductible: Joi.number(),
    yourAnnualPensionWife: Joi.number(),
    yourAnnualDeductibleWife: Joi.number(),
    workingIncome: Joi.boolean(),
    grossSalary: Joi.number(),
    grossSalaryWife: Joi.number(),
    otherIncomeOptions: Joi.boolean(),
    overseasIncome: Joi.number(),
    overseasIncomeWife: Joi.number(),
    businessIncomeOptions: Joi.boolean(),
    netAssets: Joi.number(),
    netProfit: Joi.number(),
    netAssetsWife: Joi.number(),
    netProfitWife: Joi.number(),
  
    loanOnFunds: Joi.boolean(),

    
  });
  return schema.validate(threshold);
};

module.exports = UserData_AgePension_schema;
