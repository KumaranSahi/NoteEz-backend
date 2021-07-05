const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    signinUser(email: String, password: String): SigninObject
  }

  type Note {
    id: ID
    content: String
    title: String
  }

  type SignupObject {
    ok: Boolean
    message: String
  }

  type SigninObject {
    name: String
    token: String
  }

  type passwordChangedObject {
    ok: Boolean
    message: String
  }

  type Mutation {
    signupUser(name: String, email: String, password: String): SignupObject

    changePassword(
      email: String
      password: String
      confirmPassword: String
    ): passwordChangedObject

    createNote(content: String, title: String): Note

    editNote(content: String, title: String, noteId: String): Note

    deleteNote(noteId: String): String
  }
`;

module.exports = { typeDefs };
