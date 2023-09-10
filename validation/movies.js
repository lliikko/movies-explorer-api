const { celebrate, Joi } = require('celebrate');
const { regexp } = require('../utils/constans');

module.exports.makeMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexp).required(),
    trailerLink: Joi.string().regex(regexp).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().regex(regexp).required(),
    movieId: Joi.number().required(),
  }),
});
module.exports.deleteMovie = celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().required().hex().length(24),
  }),
});
