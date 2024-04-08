require('dotenv').config();
const express = require('express');
const router = express.Router();
const validate = require('../validator');

const contactCon = require('../controller/user')
// GET /feed/posts
router.get('/', contactCon.getAllUsers);

router.get('/:id', contactCon.getOneUser);

router.put('/update/:id', validate.updateUserValidationRules, validate.handleValidationErrors, contactCon.updateUser);
// userValidationRules(), validate,
router.post('/',  contactCon.createUser);

router.delete('/:id', contactCon.deleteUser);

module.exports = router;