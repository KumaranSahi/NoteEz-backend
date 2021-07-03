const { signupUser, signinUser } = require("./resolvers/userResolver");

const resolvers = {
  Query: {
    hello: () => "Heyyo",
  },

  Mutation: {
    signupUser: signupUser,
    signinUser: signinUser,
    // createNote: async (_, { content, image }) => {
    //   const note = await Note.create({
    //     content: content,
    //   });
    //   return note;
    // },
  },
};

module.exports = { resolvers };
