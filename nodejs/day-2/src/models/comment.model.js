const { loadDB, saveDB } = require("@/utils/jsonDB");

const RESOURCE_NAME = "comments";

function getAllComments() {
  return loadDB(RESOURCE_NAME);
}

function getCommentById(id) {
  const comments = loadDB(RESOURCE_NAME);
  return comments.find((comment) => comment.id === id) || null;
}

function createComment(commentData) {
  const comments = loadDB(RESOURCE_NAME);
  const newId = comments.length > 0 ? Math.max(...comments.map((c) => parseInt(c.id))) + 1 : 1;

  const newComment = {
    id: newId.toString(),
    postId: commentData.postId,
    content: commentData.content,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  saveDB(RESOURCE_NAME, comments);
  return newComment;
}

function updateComment(id, updateData) {
  const comments = loadDB(RESOURCE_NAME);
  const commentIndex = comments.findIndex((comment) => comment.id === id);

  if (commentIndex === -1) {
    return null;
  }

  comments[commentIndex] = {
    ...comments[commentIndex],
    content: updateData.content,
  };

  saveDB(RESOURCE_NAME, comments);
  return comments[commentIndex];
}

function deleteComment(id) {
  const comments = loadDB(RESOURCE_NAME);
  const commentIndex = comments.findIndex((comment) => comment.id === id);

  if (commentIndex === -1) {
    return false;
  }

  comments.splice(commentIndex, 1);
  saveDB(RESOURCE_NAME, comments);
  return true;
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
