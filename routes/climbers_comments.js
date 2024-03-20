require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/climbers_comments')
// GET /feed/posts
router.get('/', contactCon.getAllComments);

router.get('/:id', contactCon.getOneComment);

module.exports = router;