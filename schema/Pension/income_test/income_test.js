const Joi = require("joi");

const income_test_schema = (income_test) => {
  const schema = Joi.object({
   
    situation: Joi.string(),
    income_full_pension: Joi.number(),
    income_part_pension: Joi.number(),
    reduction_factor: Joi.number()

  });
  return schema.validate(income_test);
};

module.exports = income_test_schema;
