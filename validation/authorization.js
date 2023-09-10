const { celebrate, Joi } = require('celebrate');

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi
      .string()
      .required()
      .trim()
      .min(2)
      .max(30),
  }),
});
