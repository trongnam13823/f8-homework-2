const postModel = require("@/src/models/post.model");

function getAllPosts(req, res) {
  try {
    const posts = postModel.getAllPosts();
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    }));
    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getPostById(req, res) {
  try {
    const { id } = req.params;
    const post = postModel.getPostById(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createPost(req, res) {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const newPost = postModel.createPost({ title, content });
    res.status(201).json({
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      createdAt: newPost.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const updatedPost = postModel.updatePost(id, { title, content });
    
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deletePost(req, res) {
  try {
    const { id } = req.params;
    const deleted = postModel.deletePost(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
