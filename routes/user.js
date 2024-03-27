require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/user')
// GET /feed/posts
router.get('/', contactCon.getAllUsers);

router.get('/:id', contactCon.getOneUser);

router.get('/login', contactCon.getLogin);

router.put('/update/:id', contactCon.updateUser);

router.post('/', contactCon.createUser);

router.delete('/:id', contactCon.deleteUser);

module.exports = router;