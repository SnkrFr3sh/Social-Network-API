
const { reactionSchema } = require('../models');
const Thought = require('../models/Thought');
const User = require('../models/User');


module.exports = {
  getThoughts(req, res) {
    Thought.find()
      // ADD SORT HERE

      .then((dbThoughtData) => {
        res.json(dbThoughtData)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "cannot find thought" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  createThought(req, res) {
    Thought
      .create(req.body)
      .then((dbThoughtData) => {
        console.log('params',req.params.userId)
        console.log('body',req.body.userId)
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        res.status(200).json(dbThoughtDb)
      })
      .catch((err) => {
        res.status(500).json(err)
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body, },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'cannot find thought' });
        } res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).josn({ message: 'cannot find thought' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      }
      )
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body.reactionId } },
      { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: ' Cannot find thought' })
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  },
  removeReaction(req, res) {
    Thought.findByIdAndUpdate({ _id: req.params.thoughtId },
      { $pull: { friends: req.params.reactionId } },
      { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'cannot find thought' })
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      })
  }

}

