const { Note, User } = require("../models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

const createNote = async (_, { content, title }, { req }) => {
  if (!req.isAuth) {
    throw new AuthenticationError("Unauthenticated!");
  }
  const userId = req.userId;
  try {
    const note = await Note.create({
      content: content,
      title: title,
      by: userId,
    });
    const user = await User.findById(userId);
    user.notes.push(note._id);
    user.save();
    return {
      id: note._id,
      content: note.content,
      title: title,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

const editNote = async (_, { content, title, noteId }, { req }) => {
  if (!req.isAuth) {
    throw new AuthenticationError("Unauthenticated!");
  }
  try {
    const note = await Note.findById(noteId);
    await note.updateOne({
      title: title,
      content: content,
    });

    return {
      id: noteId,
      content: content,
      title: title,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

const deleteNote = async (_, { noteId }, { req }) => {
  if (!req.isAuth) {
    throw new AuthenticationError("Unauthenticated!");
  }
  const userId = req.userId;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });
    const note = await Note.findById(noteId);
    await note.deleteOne();
    return noteId;
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

module.exports = { createNote, editNote, deleteNote };
