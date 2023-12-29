const Joi = require("joi");

const adviser_theme_schema = (adviser_theme) => {
  const schema = Joi.object({
   
    name: Joi.string(),
    color: Joi.string(),
    ImageUrl: Joi.string(),
    Email: Joi.string(),
    Website: Joi.string(),
    Adviser_Fk: Joi.string(),
    Phone: Joi.string(),
    AppPassword: Joi.string(),
    SmtpHost: Joi.string(),
    SmtpMail: Joi.string(),
    CompanyName: Joi.string(),
    SmtpPort: Joi.number(),
    SmtpSecure1: Joi.string(),


  });
  return schema.validate(adviser_theme);
};

module.exports = adviser_theme_schema;
