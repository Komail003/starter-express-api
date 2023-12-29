const Joi = require("joi");

const UerTracking_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    UserName: Joi.string(),
    UserEmail: Joi.string().email({ tlds: { allow: false } }),
    DateTime: Joi.string(),
    Calculator: Joi.string(),
    ReferredStatus: Joi.boolean(),
    isDuplicated: Joi.boolean(),
    Order: Joi.number(),
    SoftDelete: Joi.boolean()
  });
  return schema.validate(threshold);
};

module.exports = UerTracking_schema;
