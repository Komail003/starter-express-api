const Joi = require("joi");

const work_bonus_schema = (bonus) => {
  const schema = Joi.object({
    name: Joi.string(),
    work_bonus_fortnight: Joi.number(),
    work_bonus_half_fortnight: Joi.number()

  });
  return schema.validate(bonus);
};

module.exports = work_bonus_schema;
