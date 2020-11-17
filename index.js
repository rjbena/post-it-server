const { ApolloServer, PubSub } = require("apollo-server");
const colors = require("colors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./graphql/typeDefs.js");
const resolvers = require("./graphql/resolvers");

dotenv.config();
const pubsub = new PubSub();
// ! means required

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`MongoDB Connected`.cyan.underline);
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`.yellow.bold);
  })
  .catch((err) => {
    console.log(err);
  });
