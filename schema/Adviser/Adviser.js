const Joi = require("joi");

const Adviser_Table_schema = (threshold) => {
  const schema = Joi.object({
    _id: Joi.string(), // Allow _id field
    adviserName: Joi.string(),
    Password: Joi.string(),
    CompanyName: Joi.string(),
    Designation: Joi.string(),
    CompanyAddress: Joi.string(),
    CompanyEmail: Joi.string().email({ tlds: { allow: false } }),
    CompanyPhone: Joi.string().pattern(/^\+\d{1,4}-\d{1,14}$/),
    DOJ: Joi.string(),
    Package: Joi.string(),
    Opt: Joi.string(),
    SoftDelete: Joi.number(),
    Domain: Joi.string(),
    
  });
  return schema.validate(threshold);
};

module.exports = Adviser_Table_schema;
