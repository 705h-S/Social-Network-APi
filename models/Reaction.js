const { Schema, Types } = require("mongoose");

// adding schema for reactions
const reactionSchema = new Schema(
  // properties
  {
    reactionid: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    //   created:{

    //   }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
// telling other files to look in here
module.exports = reactionSchema;
