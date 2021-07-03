const {
  signupUser,
  signinUser,
  changePassword,
} = require("./resolvers/userResolver");

const resolvers = {
  Query: {
    hello: () => "Heyyo",
  },

  Mutation: {
    signupUser: signupUser,
    signinUser: signinUser,
    changePassword: changePassword,
    // createNote: async (_, { content, image }) => {
    //   const note = await Note.create({
    //     content: content,
    //   });
    //   return note;
    // },
  },
};

module.exports = { resolvers };
