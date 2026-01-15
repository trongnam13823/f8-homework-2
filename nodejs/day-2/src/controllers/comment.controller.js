const commentModel = require("@/src/models/comment.model");

function getAllComments(req, res) {
  try {
    const comments = commentModel.getAllComments();
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      createdAt: comment.createdAt
    }));
    res.json(formattedComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function getCommentById(req, res) {
  try {
    const { id } = req.params;
    const comment = commentModel.getCommentById(id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json({
      id: comment.id,
      postId: comment.postId,
      content: comment.content,
      createdAt: comment.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function createComment(req, res) {
  try {
    const { postId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({ error: 'postId and content are required' });
    }
    
    const newComment = commentModel.createComment({ postId, content });
    res.status(201).json({
      id: newComment.id,
      postId: newComment.postId,
      content: newComment.content,
      createdAt: newComment.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const updatedComment = commentModel.updateComment(id, { content });
    
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json({
      id: updatedComment.id,
      postId: updatedComment.postId,
      content: updatedComment.content,
      createdAt: updatedComment.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const deleted = commentModel.deleteComment(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
