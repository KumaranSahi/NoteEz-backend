const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Heyyo",
  },
};

module.exports = { typeDefs, resolvers };
