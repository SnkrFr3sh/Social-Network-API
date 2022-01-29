const { Application } = require('express');
const res = require('express/lib/response');
const { restart } = require('nodemon');
const { User, Thought } = require('../models/');

const userController = {
  getUsers(req, res) {
    User.find()
      .then((userData) => {
        res.json(userData)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('friends')
      .populate('thought')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "no user with that id" })
          : res.json(userData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  createUser(req, res) {
    User.Create(req.body)
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "cannot find user" });
        } res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'Cannot find User' })
        }
        return Thought.deleteMany({ _id: { $in: userData.thoughts } })
      })
      .then(() => {
        res.json({ message: 'User and thier thoughts deleted' })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });

  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {}

    )
  }

}














