const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost,getMyPosts } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
// const { post } = require('./authRoutes');

// Route to create a new post
router.post('/', protect, createPost);

// Route to get all posts
router.get('/', getAllPosts);

// to get only posts posted by the authenticated user
router.get("/my-posts", protect,getMyPosts);

// Route to get a post by ID
router.get('/:id', getPostById);



// Route to update a post by ID
router.put('/:id', protect, updatePost);

// Route to delete a post by ID
router.delete('/:id', protect, deletePost);

module.exports = router;
