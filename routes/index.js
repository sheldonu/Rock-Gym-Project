// -- The routes that I am using
const express = require('express');
const router = express.Router();

//routes
try{
    router.use('/warmies', require('./warmies'));
    router.use('/orders', require('./orders' ))
    router.use('/', require('./swagger'));
}catch (error){
    console.log(error)

    let myError = document.createElement("p");
    myError.innerHTML = "Page not found. Sorry!" + error;
    document.body.appendChild(myError);

}

module.exports = router;