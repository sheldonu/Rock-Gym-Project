require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/routes_set')
// GET /feed/posts
router.get('/', contactCon.getAllRoutes);

router.get('/:id', contactCon.getOneRoute);

router.get('/login', contactCon.getLogin);

router.put('/update/:id', contactCon.updateRoute);

router.post('/', contactCon.createRoute);

module.exports = router;