const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { validateCard } = require('../middlewares/validators');

const {
  getAllCards, postCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', authMiddleware, getAllCards);
router.post('/cards', authMiddleware, validateCard, postCard);
router.delete('/cards/:id', authMiddleware, deleteCardById);
router.put('/cards/:id/likes', authMiddleware, likeCard);
router.delete('/cards/:id/likes', authMiddleware, dislikeCard);

module.exports = router;
