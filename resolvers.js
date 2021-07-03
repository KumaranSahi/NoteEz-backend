const {
  signupUser,
  signinUser,
  changePassword,
} = require("./resolvers/userResolver");
const { createNote } = require("./resolvers/noteResolver");

const resolvers = {
  Query: {
    signinUser: signinUser,
  },

  Mutation: {
    signupUser: signupUser,
    changePassword: changePassword,
    createNote: createNote,
  },
};

module.exports = { resolvers };
