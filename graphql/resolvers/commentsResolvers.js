const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/postModel.js");
const checkAuth = require("../../utils/checkAuth.js");

module.exports = {
  Mutation: {
    //arrow function version
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (commentIndex !== -1) {
          if (
            post.comments[commentIndex].username === username ||
            post.username === username
          ) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Comment not found");
        }
      } else {
        throw new UserInputError("Post does not exist");
      }
    },
    async likePost(_, { postId }, context) {
      const post = await Post.findById(postId);
      const { username } = checkAuth(context);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //Post already liked. Unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    // async createComment(_, { postId, body }, context) {
    //   const user = checkAuth(context);

    //   try {
    //     const post = await Post.findById(postId);
    //     if (post) {
    //       const comment = {
    //         username: user.username,
    //         body,
    //         createdAt: new Date().toISOString(),
    //       };
    //       post.comments.push(comment);
    //       await post.save();
    //       return post;
    //     } else {
    //       throw new Error("Post not found");
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
  },
};
