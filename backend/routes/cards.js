const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  deleteCardLike,
} = require('../controllers/cards');
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCardValidation, createCard);
router.delete('/cards/:id', cardIdValidation, deleteCardById);
router.put('/cards/:id/likes', cardIdValidation, likeCard);
router.delete('/cards/:id/likes', cardIdValidation, deleteCardLike);

module.exports = router;
