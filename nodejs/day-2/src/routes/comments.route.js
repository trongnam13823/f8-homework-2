const express = require('express');
const router = express.Router();
const commentController = require("@/src/controllers/comment.controller");

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
