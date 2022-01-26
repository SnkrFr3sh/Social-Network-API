const router = require('express').Router();
const {
  getFriends,
  getSingleFriend,
  createFriend,
  deleteFriend,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleuser).delete(deleteuser);

// /api/Friends/:FriendId/assignments
router.route('/:FriendId/assignments').post(addAssignment);

// /api/Friends/:FriendId/assignments/:assignmentId
router.route('/:FriendId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
