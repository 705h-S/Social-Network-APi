// look into model
const { User, Thought } = require('../models');

module.exports = {
    // retreave all thoughts
    getAllThoughts(req, res) {
        Thought.find()
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => res.status(500).json(err));
      },
      // retreave single thought
      getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
            });
    },
    // write/create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                  { _id: req.body.userId },
                  { $push: { thoughts: thought._id } },
                  { new: true }
                );
              })
              .then((user) =>
                !user
                  ? res.status(404).json({
                      message: 'Thought created, but found no user with that id',
                    })
                  : res.json('Created a thought 🎉')
              )
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
          },
     // Update thought
     updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
          )
            .then((thought) =>
              !thought
                ? res.status(404).json({ message: 'No thought with that id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
         

}
