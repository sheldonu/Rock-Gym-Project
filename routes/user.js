require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/user')
// GET /feed/posts
router.get('/', contactCon.getAllUsers);

router.get('/:id', contactCon.getOneUser);

module.exports = router;