const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { makeMovie } = require('../validation/movies');

router.get('/', getMovies);
router.post('/', makeMovie, createMovie);

router.delete('/:objectId', deleteMovie, deleteMovie);

module.exports = router;
