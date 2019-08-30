const express = require('express');
const Post = require('../models/Post');
const generateSlug = require('../utils/slugify');

const validatePost = require('../validation/post');

const router = express.Router();

// @route   GET /api/v1/post/
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(404).json({ posts: 'No post found' });
  }
});

// @route   GET /api/v1/post/:slug
// @desc    Get post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    return res.json(post);
  } catch (err) {
    return res.status(404).json({ post: 'No corresponding post found' });
  }
});

// @route   POST /api/v1/post/
// @desc    Create new post
// @access  Private
router.post('/', async (req, res) => {
  const { errors, isValid } = validatePost(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const slug = await generateSlug(Post, req.body.title);
    await Post.create({ ...req.body, slug });
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ post: 'An error occurred while trying to create the post' });
  }
});

// @route   PUT /api/v1/post/:slug
// @desc    Update post by slug
// @access  Private
router.put('/:slug', async (req, res) => {
  const { errors, isValid } = validatePost(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const post = await Post.findOne({ slug: req.params.slug });
    let slug;

    if (post.title !== req.body.title) {
      slug = await generateSlug(Post, req.body.title);
    }

    await Post.updateOne({ ...req.body, slug: slug || post.slug });

    return res.json({ success: true });
  } catch (err) {
    return res.status(404).json({ post: 'No corresponding post found' });
  }
});

// @route   DELETE /api/v1/post/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).json({ post: 'No corresponding post found' });
  }
});

module.exports = router;
