const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    //context: authMiddleware
  });
  //start the apollo server
  await server.start();
  //integrate apollo server with express application as middleware
  server.applyMiddleware({ app });
  //log where we can go to test gql api (endpoint)
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

};

//initialize apollo server
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());