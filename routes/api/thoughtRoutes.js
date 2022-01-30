const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller.js');
const { route } = require('./userRoutes.js');


router.route('/')
  .get(getThoughts)
  // .post(createThought);


router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions/')
  .post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

router.route('/:userId')
  .post(createThought)

module.exports = router;
