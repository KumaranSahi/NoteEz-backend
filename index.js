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
const PORT = process.env.PORT || 8000;

app.use(authentication);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
