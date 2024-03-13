require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/warmies');

// GET /feed/posts
router.get('/', contactCon.getAll);

router.get('/:id', contactCon.getOne);

//create statement
// this is were we do all the validation
router.post('/create', userValidationRules(), validate, contactCon.newLittleWarmies);

// update statement
router.put('/update/:id', contactCon.putLittleWarmies);

// delete statement
router.delete('/del/:id', contactCon.delLittleWarmies);


module.exports = router;