// https://mongoosejs.com/docs/guide.html
const { Schema, model } = require('mongoose');

// using regex to validate email
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// defining schema
const userSchema = new Schema(
  // properties
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    // --- Subdocument---
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // --- end ---
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual;  this won't save into model or db but it will load onto the html
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// telling other files to look into this file for schema
const User = model("User", userSchema);
module.exports = User;
