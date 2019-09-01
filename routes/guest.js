const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  ADMIN_EMAIL,
  URL,
  ADMIN_USER,
  ADMIN_PASSWORD,
  SECRET_TOKEN,
} = require('../config');

const validateContact = require('../validation/contact');
const validateLogIn = require('../validation/login');

const router = express.Router();

// @route   POST /api/v1/guest/contact
// @desc    Send email
// @access  Public
router.post('/contact', async (req, res) => {
  const { errors, isValid } = validateContact(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === '465',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${req.body.name}" <${req.body.email}>`,
      to: ADMIN_EMAIL,
      subject: `New message from ${URL}`,
      text: req.body.message,
    });

    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ send: 'An error occurred while trying to send the email' });
  }
});

// @route   POST /api/v1/guest/login
// @desc    Login in user
// @access  Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLogIn(req.body);

  if (req.body.username !== ADMIN_USER || req.body.password !== ADMIN_PASSWORD) {
    errors.username = 'Username or password incorrect';
  }

  if (!isValid || errors.username) {
    return res.status(400).json(errors);
  }

  const token = await jwt.sign({ username: ADMIN_USER }, SECRET_TOKEN);

  return res.json({ success: true, token });
});

module.exports = router;
