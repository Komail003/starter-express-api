const Joi = require("joi");

const deemed_income_schema = (income) => {
  const schema = Joi.object({
    situation: Joi.string(),
    first_deemed: Joi.number(),
    first_rate: Joi.number(),
    over_deemed: Joi.number(),
    over_rate: Joi.number(),


  });
  return schema.validate(income);
};

module.exports = deemed_income_schema;
