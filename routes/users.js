const router = require('express').Router();

const {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
