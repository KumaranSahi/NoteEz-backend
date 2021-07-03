const { Note, User } = require("../models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { cloudinary } = require("../config/cloudinary");

const createNote = async (_, { content, image }, { req }) => {
  if (!req.isAuth) {
    throw new AuthenticationError("Unauthenticated!");
  }
  const userId = req.userId;
  try {
    let uploadInfo;
    let imageData;
    if (image) {
      uploadInfo = await cloudinary.uploader.upload(image);
      imageData = {
        public_id: uploadInfo.public_id,
        imageUrl: uploadInfo.url,
      };
    }
    const note = await Note.create({
      content: content,
      image: imageData || undefined,
      by: userId,
    });
    const user = await User.findById(userId);
    user.notes.push(note._id);
    user.save();
    return {
      id: note._id,
      content: note.content,
      image: note.image.imageUrl,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

const editNote = async (_, { content, image, noteId }, { req }) => {
  if (!req.isAuth) {
    throw new AuthenticationError("Unauthenticated!");
  }
  try {
    const note = await Note.findById(noteId);
    let uploadInfo;
    let imageData;
    if (image && image.length > 0) {
      if (note.image) await cloudinary.uploader.destroy(note.image.public_id);
      uploadInfo = await cloudinary.uploader.upload(image);
      imageData = {
        public_id: uploadInfo.public_id,
        imageUrl: uploadInfo.url,
      };
      await note.updateOne({
        image: imageData,
      });
    }
    await note.updateOne({
      content: content,
    });

    return {
      id: noteId,
      content: content,
      image: imageData ? imageData.imageUrl : null,
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
    if (note.image.length > 0)
      await cloudinary.uploader.destroy(note.image.public_id);
    await note.deleteOne();
    return noteId;
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

module.exports = { createNote, editNote, deleteNote };
