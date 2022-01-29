const res = require('express/lib/response');
const Thought = require('../models/Thought');
const User = require('../models/User');


module.exports = {
  getUsers(req, res) {
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
        if (!user) {
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
      .then((userData) => {
        !userData
          ? res.status(404).json({ message: "thought was created, but no user with that id" })
          : res.json('Create new thought!')
      })
      .catch((err) => {
        console.log
        res.status(500).json(err)
      });
  }
}

