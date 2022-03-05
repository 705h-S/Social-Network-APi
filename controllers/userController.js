// telling to look in models
const { User, Thought } = require("../models");

module.exports = {
  // retreave Users
  allUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // single user
  getAUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete User
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }, { new: true })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: userData.thoughts } })
      )
      .then(() => res.json({ message: "User succesfully deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  // add a friend
  addAmigo(req, res) {
    console.log("You are adding a new friend");
    console.log(req.body);

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID." })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend
  removeAmigo(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate({ path: "friends", select: "-__v" })
      .select("-__v")
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that ID." })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
