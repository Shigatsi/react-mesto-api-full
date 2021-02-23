const router = require('express').Router();

const {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar, login
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/signin', login);
router.post('/signup', postUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
