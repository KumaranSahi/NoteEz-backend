const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
