// -- The routes that I am using
const express = require('express');
const router = express.Router();

//routes
try{
    router.use('/setter', require('./setter'));
    router.use('/routes', require('./routes_set' ));
    router.use('/', require('./swagger'));
}catch (error){
    console.log(error)

}

module.exports = router;