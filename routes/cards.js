const router = require('express').Router();

const {
  getAllCards, postCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', postCard);
router.delete('/cards/:id', deleteCardById);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
