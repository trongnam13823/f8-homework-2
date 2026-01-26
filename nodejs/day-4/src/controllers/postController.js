const postService = require('../services/postService');

async function getPosts(req, res) {
    const { page, limit, user_id } = req.query;
    const posts = await postService.getPosts({ page, limit, user_id });

    res.pagination(posts);

}

module.exports = { getPosts };
