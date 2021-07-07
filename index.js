const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const cors = require("cors");

const authentication = require("./config/authentication");

const db = require("./config/mongoose");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
const PORT = 8000 || process.env.PORT;

app.use(authentication);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});