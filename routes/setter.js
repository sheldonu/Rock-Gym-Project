require('dotenv').config();
const express = require('express');
const router = express.Router();
const validate = require('../validator');

const contactCon = require('../controller/setter')
// GET /feed/posts
router.get('/', contactCon.getAllRouteSetters);

router.get('/:id', contactCon.getOneRouteSetter);

router.put('/update/:id', validate.updateSetterValidationRules, validate.handleValidationErrors, contactCon.updateRouteSetters);

router.post('/', validate.updateSetterValidationRules, validate.handleValidationErrors, contactCon.createSetter);
// setterValidationRules(), validate,

router.delete('/:id', contactCon.deleteSetter);



module.exports = router;