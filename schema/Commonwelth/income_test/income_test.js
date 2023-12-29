const Joi = require("joi");

const income_test_schema = (income_test) => {
  const schema = Joi.object({
    situation: Joi.string(),
    annual_income: Joi.number()

  });
  return schema.validate(income_test);
};

module.exports = income_test_schema;
