const Joi = require("joi");

const actual_payment_schema = (actual_payment) => {
  const schema = Joi.object({
   
    situation: Joi.string(),
    per_fortnight: Joi.number(),
    pharmaceutical_benefit: Joi.number(),
    pension_payment: Joi.number(),
    clean_energy_supplement: Joi.number()

  });
  return schema.validate(actual_payment);
};

module.exports = actual_payment_schema;
