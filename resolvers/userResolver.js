const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  hashingPasswords,
  emailIdCheck,
  confirmPasswordCheck,
} = require("../utils/utils");
const { UserInputError, ApolloError } = require("apollo-server-express");
const { User } = require("../models");

const signupUser = async (_, { name, email, password }) => {
  if (!name || !email || !password || !emailIdCheck(email)) {
    return {
      ok: false,
      message: "INVALID_INPUT",
    };
  }
  try {
    if (await User.findOne({ email: email })) {
      return {
        ok: false,
        message: "USER_EXISTS",
      };
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
        message: "USER_SIGNED_UP",
      };
    }
  } catch (error) {
    console.log(error);
    return {
        ok: false,
        message: "INTERNAL_ERROR",
      };
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
