const { celebrate, Joi } = require('celebrate');

module.exports.updateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    name: Joi.string().required().min(2).max(30),
  }),
});
