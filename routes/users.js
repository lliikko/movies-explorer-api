const router = require('express').Router();

const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { updateUser } = require('../validation/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUser, updateUserInfo);

module.exports = router;
