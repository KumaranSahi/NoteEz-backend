const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashingPasswords, emailIdCheck } = require("../utils/utils");
const { UserInputError, ApolloError } = require("apollo-server-express");
const { cloudinary } = require("../config/cloudinary");
const { User } = require("../models");

const signupUser = async (_, { name, email, password, image }) => {
  if (!name || !email || !password || !emailIdCheck(email)) {
    throw new UserInputError("Invalid Request");
  }
  try {
    if (await User.findOne({ email: email })) {
      throw new UserInputError("User Already Exists!");
    }
    let uploadInfo;
    let imageData;
    if (image) {
      uploadInfo = await cloudinary.uploader.upload(image);
      imageData = {
        public_id: uploadInfo.public_id,
        imageUrl: uploadInfo.url,
      };
    }
    const newPassword = await hashingPasswords(password);
    data = await User.create({
      name: name,
      email: email,
      password: newPassword,
      image: imageData,
    });
    if (data) {
      return {
        ok: true,
        message: "User signed up",
      };
    }
  } catch (error) {
    throw new ApolloError("Internal server error");
  }
};

const signinUser = async (_, { email, password }) => {
  //   try {
  const user = await User.findOne({ email: email });
  console.log(user.password);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new UserInputError("Invalid username or password");
  }
  return {
    name: user.name,
    image: user.image ? user.image.imageUrl : null,
    token: jwt.sign({ userId: user._id }, process.env["SECRET"], {
      expiresIn: "24h",
    }),
  };
  //   } catch (error) {
  //     throw new ApolloError("Internal server error");
  //   }
};

module.exports = { signupUser, signinUser };
