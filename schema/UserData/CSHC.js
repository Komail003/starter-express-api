const Joi = require("joi");

// UserData_AgePension_schema name ?
const UserData_AgePension_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    UserEmail: Joi.string().email({ tlds: { allow: false } }),
    relationshipStatus: Joi.string(),
    wifeDOB: Joi.date(),
    husbandDOB: Joi.date(),
    husbandDividendIncome: Joi.number(),
    wifeDividendIncome: Joi.number(),
    UserTracking_FK: Joi.object(),

    husbandFunds: Joi.number(),
    wifeFunds: Joi.number(),
    husbandInterest: Joi.number(),
    wifeInterest: Joi.number(),
    rentOptions: Joi.boolean(),
    rentFrequency: Joi.string(),
    secondPropertyRentalIncome: Joi.number(),
    secondPropertyAnnualExpense: Joi.number(),
    yourOtherIncomeStream: Joi.boolean(),
    yourAnnualPension: Joi.number(),
    yourAnnualPensionWife: Joi.number(),
    workingIncome: Joi.boolean(),
    grossSalary: Joi.number(),
    grossSalaryWife: Joi.number(),
    otherIncomeOptions: Joi.boolean(),
    overseasIncome: Joi.number(),
    overseasIncomeWife: Joi.number(),
    accountBasedPensionOptions: Joi.boolean(),
    husbandPensionAccountBased: Joi.number(),
    wifePensionAccountBased: Joi.number(),
    totalIncome: Joi.number(),
    threshold: Joi.number(),

    savingAccountsClient:Joi.array(),
    savingAccountsWife:Joi.array(),
    sharePortfolioClient:Joi.array(),
    sharePortfolioWife:Joi.array(),



    
  });
  return schema.validate(threshold);
};

module.exports = UserData_AgePension_schema;
