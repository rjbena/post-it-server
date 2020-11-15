const postsResolvers = require("./postsResolvers.js");
const usersResolvers = require("./usersResolvers.js");
const commentsResolvers = require("./commentsResolvers.js");

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
