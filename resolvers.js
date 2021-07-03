const {
  signupUser,
  signinUser,
  changePassword,
} = require("./resolvers/userResolver");
const {
  createNote,
  editNote,
  deleteNote,
} = require("./resolvers/noteResolver");

const resolvers = {
  Query: {
    signinUser: signinUser,
  },

  Mutation: {
    signupUser: signupUser,
    changePassword: changePassword,
    createNote: createNote,
    editNote: editNote,
    deleteNote: deleteNote,
  },
};

module.exports = { resolvers };
