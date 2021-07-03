const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const db = require("./config/mongoose");

const app = express();
const PORT = 8000 || process.env.PORT;

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
