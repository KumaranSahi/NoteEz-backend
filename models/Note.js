const { Schema, Model, model } = require("mongoose");

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      imageUrl: {
        type: String,
      },
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
