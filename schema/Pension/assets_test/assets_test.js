const Joi = require("joi");

const assets_test_schema = (assets_test) => {
  const schema = Joi.object({
    situation: Joi.string(),
    home_owner_full_pension: Joi.number(),
    home_owner_part_pension: Joi.number(),
    non_home_owner_full_pension: Joi.number(),
    non_home_owner_part_pension: Joi.number()

  });
  return schema.validate(assets_test);
};

module.exports = assets_test_schema;
