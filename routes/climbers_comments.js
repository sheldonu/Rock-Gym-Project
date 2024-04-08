require('dotenv').config();
const express = require('express');
const router = express.Router();
const validate = require('../validator');

const contactCon = require('../controller/climbers_comments')
// GET /feed/posts
router.get('/', contactCon.getAllComments);

router.get('/:id', contactCon.getOneComment);

router.put('/update/:id', validate.updateCommentValidationRules, validate.handleValidationErrors, contactCon.updateComment);

router.post('/',  contactCon.createComment);

router.delete('/:id', contactCon.deleteComment);

module.exports = router;