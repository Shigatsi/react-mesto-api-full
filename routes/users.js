const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { validateLogin, validateUser } = require('../middlewares/validators');
const {
  getAllUsers, getUserById, postUser, updateUserProfile, updateUserAvatar, login
} = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, postUser);
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.patch('/users/me', authMiddleware, updateUserProfile);
router.patch('/users/me/avatar', authMiddleware, updateUserAvatar);

module.exports = router;
