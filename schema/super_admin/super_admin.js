const Joi = require("joi");

const admin_schema = (admin) => {
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string()

  });
  return schema.validate(admin);
};

module.exports = admin_schema;
