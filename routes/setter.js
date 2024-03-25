require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { userValidationRules, validate } = require('../validator');

const contactCon = require('../controller/setter')
// GET /feed/posts
router.get('/', contactCon.getAllRouteSetters);

router.get('/:id', contactCon.getOneRouteSetter);

router.put('/update/:id', contactCon.updateRouteSetters);



module.exports = router;