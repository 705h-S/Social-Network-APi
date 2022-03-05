// telling to look in models
const { User, Thought } = require('../models');

module.exports = {
    // retreave Users
    allUsers(req, res) {
        User.find()
          
          .populate({path: 'thoughts', select: '-__v'})
          .populate({path: 'friends', select: '-__v'})
          .select('-__v')
          .then((userData) => res.json(userData))
          .catch((err) => res.status(500).json(err));
      },
      // single user
      getAUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .populate({path: 'thoughts', select: '-__v'})
          .populate({path: 'friends', select: '-__v'})
          .select('-__v')
          .then((userData) =>
            !userData
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(userData)
          )
          .catch((err) => res.status(500).json(err));
      },

}