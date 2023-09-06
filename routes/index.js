const router = require('express').Router();
const { createUser, login, signout } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { signin, signup } = require('../validation/authorization');

router.post('/signin', signin, login);

router.post('/signup', signup, createUser);

router.post('/signout', auth, signout);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;
