const express = require('express');

const router = express.Router();

// @route   GET /api/v1/post/
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {});

// @route   GET /api/v1/post/:slug
// @desc    Get post by slug
// @access  Public
router.get('/:slug', async (req, res) => {});

// @route   POST /api/v1/post/
// @desc    Create new post
// @access  Private
router.post('/', async (req, res) => {});

// @route   PUT /api/v1/post/:slug
// @desc    Update post by slug
// @access  Private
router.put('/:slug', async (req, res) => {});

// @route   DELETE /api/v1/post/:slug
// @desc    Delete post by slug
// @access  Private
router.delete('/:slug', async (req, res) => {});

module.exports = router;
