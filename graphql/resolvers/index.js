const postsResolvers = require("./postsResolvers.js");
const usersResolvers = require("./usersResolvers.js");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
