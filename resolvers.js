const {
  signupUser,
  signinUser,
  changePassword,
  guestSigninUser,
} = require("./resolvers/userResolver");
const {
  fetchNotes,
  createNote,
  editNote,
  deleteNote,
} = require("./resolvers/noteResolver");

const resolvers = {
  Query: {
    signinUser: signinUser,
    fetchNotes: fetchNotes,
    signinGuest: guestSigninUser,
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
