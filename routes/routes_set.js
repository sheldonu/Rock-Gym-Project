require('dotenv').config();
const express = require('express');
const router = express.Router();
const validate = require('../validator');

const contactCon = require('../controller/routes_set')
// GET /feed/posts
router.get('/', contactCon.getAllRoutes);

router.get('/:id', contactCon.getOneRoute);

// router.get('/login', contactCon.getLogin);

router.put('/update/:id', validate.updateRouteValidationRules, validate.handleValidationErrors, contactCon.updateRoute);

router.post('/',  contactCon.createRoute);

router.delete('/:id', contactCon.deleteRoute);

module.exports = router;