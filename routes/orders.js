require('dotenv').config();
const express = require('express');
const router = express.Router();
let TOKEN = false

const contactCon = require('../controller/orders');

// this is were we do all the validation
router.post('/create', contactCon.newOrder);

// update statement
router.put('/update/:id', contactCon.putOrder);

if (TOKEN){
        router.get('/', contactCon.getAllOrders);
        // delete statement
        router.delete('/del/:id', contactCon.delOrder);
    }



// oauth account
router.get('/auth', async (req, res) => {
    console.log('it went in')
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
  });

router.get('/orders', async (req, res) => {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json'} };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        console.log("my token:", token);

        res.redirect(`/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message}))
});

module.exports = router;