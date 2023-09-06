const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-requesr');
const NotFoundError = require('../errors/not-found');
const ForbidenError = require('../errors/forbiden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ ...req.body, owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { objectId } = req.params;
  const ownerId = req.user._id;

  Movie.findById(objectId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError();
      }

      if (movie.owner.toString() !== ownerId) {
        throw new ForbidenError();
      }

      return movie;
    })
    .then((movie) => {
      Movie.deleteOne(movie)
        .then(() => {
          res.status(200).send({ message: 'delete' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }

      next(err);
    });
};
