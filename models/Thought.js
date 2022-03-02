const { Schema, model } = require("mongoose");
// We will be refrencing from Reaction schema
const reactionSchema = require("./Reaction");

// Schema for thoughts
const thoughtSchema = new Schema(
  // properties
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // --- SubDocs---
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [reactionSchema],
    // --- End subDocs---
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Virtual wont save count to db or schema but would show up in the html
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
