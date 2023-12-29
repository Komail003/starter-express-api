const Joi = require("joi");

const reduced_by_schema = (reduced_by) => {
  const schema = Joi.object({
   
    dividing_factor: Joi.number(),
    reduction_rate: Joi.number()

  });
  return schema.validate(reduced_by);
};

module.exports = reduced_by_schema;
