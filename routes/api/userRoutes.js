const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  createFriend,
  deleteFriend,
  addAssignment,
  removeAssignment,
} = require('../../controllers/thought-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleuser).delete(deleteuser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
