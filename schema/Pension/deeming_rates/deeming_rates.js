const Joi = require("joi");

const deeming_rates_schema = (deeming_rates) => {
  const schema = Joi.object({
   
    first_deeming_rates: Joi.number(),
    balance_deeming_rates: Joi.number()

  });
  return schema.validate(deeming_rates);
};

module.exports = deeming_rates_schema;
