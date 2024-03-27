const Joi = require("joi");

const UserData_AgePension_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    UserEmail: Joi.string().email({ tlds: { allow: false } }),
    relationshipStatus: Joi.string(),
    wifeDOB: Joi.date(),
    husbandDOB: Joi.date(),
    gift: Joi.boolean(),
    // giftExtended: Joi.string(),
    UserTracking_FK: Joi.object(),

    businessIncomeOptions: Joi.boolean(),
    benefits: Joi.boolean(),
    centreLinkBenefits: Joi.number(),

    centreLinkBenefitsWife: Joi.number(),
    husbandSavingsAccounts: Joi.number(),
    wifeSavingsAccounts: Joi.number(),
    husbandSuperAnnaution: Joi.number(),
    wifeSuperAnnaution: Joi.number(),
    husbandPension: Joi.number(),
    wifePension: Joi.number(),
    husbandPortfolio: Joi.number(),
    wifePortfolio: Joi.number(),
    husbandFunds: Joi.number(),
    wifeFunds: Joi.number(),
    rentOptions: Joi.boolean(),
    rentFrequency: Joi.string(),
    secondPropertyRentalIncome: Joi.number(),
    secondPropertyAnnualExpense: Joi.number(),
    yourOtherIncomeStream: Joi.boolean(),
    yourAnnualPension: Joi.number(),
    yourAnnualPensionWife: Joi.number(),
    yourAnnualDeductible: Joi.number(),
    yourAnnualDeductibleWife: Joi.number(),
    grossSalary: Joi.number(),
    grossSalaryWife: Joi.number(),
    workingIncome: Joi.boolean(),
    otherIncomeOptions: Joi.boolean(),
    overseasIncome: Joi.number(),
    overseasIncomeWife: Joi.number(),
    totalIncome1: Joi.number(),
    incomeThreshold1: Joi.number(),
    
   
    
  });
  return schema.validate(threshold);
};

module.exports = UserData_AgePension_schema;
