const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Note {
    id: ID
    content: String
    image: String
  }

  type SignupObject {
    ok: Boolean
    message: String
  }

  type SigninObject {
    name: String
    image: String
    token: String
  }

  type passwordChangedObject {
    ok: Boolean
    message: String
  }

  type Mutation {
    signupUser(
      name: String
      email: String
      password: String
      image: String
    ): SignupObject

    signinUser(email: String, password: String): SigninObject
    changePassword(
      email: String
      password: String
      confirmPassword: String
    ): passwordChangedObject
    # createNote(content: String, image: String): Note
  }
`;

module.exports = { typeDefs };
