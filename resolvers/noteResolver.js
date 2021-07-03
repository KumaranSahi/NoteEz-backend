const { Note, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

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

module.exports = { createNote };
