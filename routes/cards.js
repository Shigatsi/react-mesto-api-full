const router = require('express').Router();
const { validateCard } = require('../middlewares/validators');

const {
  getAllCards, postCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', validateCard, postCard);
router.delete('/cards/:id', deleteCardById);
router.put('/cards/:id/likes', likeCard);
router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
