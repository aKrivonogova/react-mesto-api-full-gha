const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies

const {
  getUsers,
  updateUserAvatar,
  getCurrentUser,
  getUser,
  updateUser,
} = require('../controllers/users');
const {
  getUserValidation,
  updateUserAvatarValidation,
  updateUserInfoValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/:id', getUserValidation, getUser);
router.patch('/users/me', updateUserInfoValidation, updateUser);
router.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);
router.get('/user/me', getCurrentUser);
module.exports = router;
