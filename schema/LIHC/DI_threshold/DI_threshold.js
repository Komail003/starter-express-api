const Joi = require("joi");

const DI_threshold_schema = (threshold) => {
  const schema = Joi.object({
    situation: Joi.string(),
    first_deemed: Joi.number(),
    first_rate: Joi.number(),
    over_deemed: Joi.number(),
    over_rate: Joi.number()

  });
  return schema.validate(threshold);
};

module.exports = DI_threshold_schema;
