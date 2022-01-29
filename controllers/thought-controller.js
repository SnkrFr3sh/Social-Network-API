
const Thought = require('../models/Thought');
const User = require('../models/User');


module.exports = {
  getThoughts(req, res) {
    Thought.find()
      // ADD SORT HERE
      .then((thoughtData) => {
        res.json(thoughtData)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No user with that ID' })
        }

      }
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findoneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: "thought was created, but no user with that id" })
          : res.json('Create new thought!')
      })
      .catch((err) => {
        console.log
        res.status(500).json(err)
      });
  },
  updateThought(req, res) {
    Thought.findoneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body, },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'cannot find thought' });
        } res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).josn({ message: 'cannot find thought' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      }
      )
  }
}

