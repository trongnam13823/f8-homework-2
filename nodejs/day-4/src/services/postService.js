const Post = require('../models/postModel');

const postService = {
    getPosts: async ({ user_id, page, limit }) => {
        return await Post.getAllPosts({ user_id, page, limit });
    }
};

module.exports = postService;
