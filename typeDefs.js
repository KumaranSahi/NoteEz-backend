const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    signinUser(email: String, password: String): SigninObject
    fetchNotes: FetchedNotes
  }

  type Note {
    id: ID
    content: String
    title: String
  }

  type FetchedNotes {
    ok: Boolean
    message: String
    notes: [Note]
  }

  type NoteObject {
    id: ID
    content: String
    title: String
    ok: Boolean
    message: String
  }

  type DeletedNoteObject {
    id: ID
    ok: Boolean
    message: String
  }

  type SignupObject {
    ok: Boolean
    message: String
  }

  type SigninObject {
    ok: Boolean
    message: String
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

    createNote(content: String, title: String): NoteObject

    editNote(content: String, title: String, noteId: String): NoteObject

    deleteNote(noteId: String): DeletedNoteObject
  }
`;

module.exports = { typeDefs };
