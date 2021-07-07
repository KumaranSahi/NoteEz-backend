const { Note, User } = require("../models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");

const fetchNotes = async (_, __, { req }) => {
  if (!req.isAuth) {
    return {
      ok: false,
      message: "UNAUTHORIZED",
    };
  }
  const userId = req.userId;
  try {
    const populatedUser = await (
      await User.findById(userId)
    ).execPopulate("notes");

    return {
      ok: true,
      message: "FETCHED_NOTES",
      notes: populatedUser.notes,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "INTERNAL_ERROR",
    };
  }
};

const createNote = async (_, { content, title }, { req }) => {
  if (!req.isAuth) {
    return {
      ok: false,
      message: "UNAUTHORIZED",
    };
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
      ok: true,
      message: "NOTE_ADDED",
      id: note._id,
      content: note.content,
      title: title,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "INTERNAL_ERROR",
    };
  }
};

const editNote = async (_, { content, title, noteId }, { req }) => {
  if (!req.isAuth) {
    return {
      ok: false,
      message: "UNAUTHORIZED",
    };
  }
  try {
    const note = await Note.findById(noteId);
    await note.updateOne({
      title: title,
      content: content,
    });

    return {
      ok: true,
      message: "NOTE_EDITED",
      id: noteId,
      content: content,
      title: title,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "INTERNAL_ERROR",
    };
  }
};

const deleteNote = async (_, { noteId }, { req }) => {
  if (!req.isAuth) {
    return {
      ok: false,
      message: "UNAUTHORIZED",
    };
  }
  const userId = req.userId;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });
    const note = await Note.findById(noteId);
    await note.deleteOne();
    return {
      ok: true,
      message: "NOTE_DELETED",
      id: noteId,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "INTERNAL_ERROR",
    };
  }
};

module.exports = { fetchNotes, createNote, editNote, deleteNote };
