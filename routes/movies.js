const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexp } = require('../utils/constans');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
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
}), createMovie);

router.delete('/:objectId', celebrate({
  params: Joi.object().keys({
    objectId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
