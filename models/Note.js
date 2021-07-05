const { Schema, Model, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title:{
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note = model("Note", noteSchema);
module.exports = Note;
