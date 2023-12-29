const Joi = require("joi");

const income_test_schema = (income_test) => {
  const schema = Joi.object({
    situation: Joi.string(),
    weekly_income: Joi.number(),
    eight_week_income: Joi.number()

  });
  return schema.validate(income_test);
};

module.exports = income_test_schema;
