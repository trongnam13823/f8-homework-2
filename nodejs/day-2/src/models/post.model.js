const { loadDB, saveDB } = require("@/utils/jsonDB");

const RESOURCE_NAME = 'posts';

function getAllPosts() {
  return loadDB(RESOURCE_NAME);
}

function getPostById(id) {
  const posts = loadDB(RESOURCE_NAME);
  return posts.find(post => post.id === id) || null;
}

function createPost(postData) {
  const posts = loadDB(RESOURCE_NAME);
  const newId = posts.length > 0 
    ? Math.max(...posts.map(p => parseInt(p.id))) + 1 
    : 1;
  
  const newPost = {
    id: newId.toString(),
    title: postData.title,
    content: postData.content,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  saveDB(RESOURCE_NAME, posts);
  return newPost;
}

function updatePost(id, updateData) {
  const posts = loadDB(RESOURCE_NAME);
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return null;
  }
  
  posts[postIndex] = {
    ...posts[postIndex],
    title: updateData.title,
    content: updateData.content
  };
  
  saveDB(RESOURCE_NAME, posts);
  return posts[postIndex];
}

function deletePost(id) {
  const posts = loadDB(RESOURCE_NAME);
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return false;
  }
  
  posts.splice(postIndex, 1);
  saveDB(RESOURCE_NAME, posts);
  return true;
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
