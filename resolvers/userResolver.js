const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  hashingPasswords,
  emailIdCheck,
  confirmPasswordCheck,
} = require("../utils/utils");
const { UserInputError, ApolloError } = require("apollo-server-express");
const { User } = require("../models");

const signupUser = async (_, { name, email, password, image }) => {
  if (!name || !email || !password || !emailIdCheck(email)) {
    throw new UserInputError("Invalid Request");
  }
  try {
    if (await User.findOne({ email: email })) {
      throw new UserInputError("User Already Exists!");
    }
    const newPassword = await hashingPasswords(password);
    data = await User.create({
      name: name,
      email: email,
      password: newPassword,
    });
    if (data) {
      return {
        ok: true,
        message: "User signed up",
      };
    }
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

const signinUser = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UserInputError("Invalid username or password");
    }
    return {
      name: user.name,
      token: jwt.sign({ userId: user._id }, process.env["SECRET"], {
        expiresIn: "24h",
      }),
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

const changePassword = async (_, { email, password, confirmPassword }) => {
  try {
    if (confirmPasswordCheck(password, confirmPassword)) {
      throw new UserInputError("Invalid Request");
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const newPassword = await hashingPasswords(password);
      await user.updateOne({ password: newPassword });
      return {
        ok: true,
        message: "User password changed",
      };
    } else {
      throw new UserInputError("Invalid Email");
    }
  } catch (error) {
    console.log(error);
    throw new ApolloError("Internal server error");
  }
};

module.exports = { signupUser, signinUser, changePassword };
