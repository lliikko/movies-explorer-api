const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');

router.post('/signup', celebrate({
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
}), createUser);

module.exports = router;
