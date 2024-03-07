const Joi = require("joi");

const UerTracking_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    Scenario: Joi.string(),
    relationshipStatus: Joi.string(),
    clientFirstName: Joi.string(),
    clientSurname: Joi.string(),
    clientPreferredName: Joi.string(),
    clientDOB: Joi.string(),
    clientEmail: Joi.string().email({ tlds: { allow: false } }),
    clientPhone: Joi.string(),

    partnerFirstName: Joi.string(),
    partnerSurname: Joi.string(),
    partnerPreferredName: Joi.string(),
    partnerDOB: Joi.string(),
    partnerEmail: Joi.string().email({ tlds: { allow: false } }),
    partnerPhone: Joi.string(),
    
    Adviser_FK: Joi.string(),
    DateTime: Joi.string(),
    Calculator: Joi.string(),
    ReferredStatus: Joi.boolean(),
    isDuplicated: Joi.boolean(),
    isNotified: Joi.boolean(),

    Order: Joi.number(),
    SoftDelete: Joi.boolean()
  });
  return schema.validate(threshold);
};

module.exports = UerTracking_schema;
