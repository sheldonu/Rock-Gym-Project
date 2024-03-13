const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const collection_name = 'orders'

//deleting an entry
function errorHandling(res, error) {
  // log error then finding the error
  console.error(error);

  if (res.status(500)) {
      res.status(500).json({ error: 'Internal Server Error' });
  } else if (res.status(404)) {
      res.status(404).json({ error: 'Page Not Found. Please return home' });
  } else if (res.status(401)) {
      res.status(401).json({ error: 'Forbidden. Sorry this is not allowed' });
  } else if (res.status(400)) {
      res.status(400).json({ error: 'Bad Request' });
  } else if (res.status(503)) {
      res.status(503).json({ error: 'Service Unavailable' });
  } else if (res.status(504)) {
      res.status(504).json({ error: 'Gateway Timeout, Please try again later' });
  } else if (res.status(408)) {
      res.status(408).json({ error: 'Request Timeout. Please try again later' });
  } else if (res.status(501)) {
      res.status(501).json({ error: 'Not Implemented' });
  } else if (res.status(502)) {
      res.status(502).json({ error: 'Bad Gateway' });
  }
}

// getting all the littlelightwarmies
const getAllOrders = async (req, res) => {
  try {
      // .find finds everything in there
      const cursor = await mongodb.getDb().db().collection(collection_name).find({});

      // Convert the cursor to an array
      const result = await cursor.toArray();

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
  } catch (error) {
      errorHandling(res, error);

  }
};

//creating a new entry
const newOrder = async (req, res) => {
    try{
      littleWarmies ={
        user_name: req.body.user_name,
        warmie_name: req.body.warmie_name,
        warmie_id: req.body.warmie_id,
        send_date: req.body.send_date,
      }
      const response = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .insertOne(littleWarmies);
  
      if (response.acknowledged) {
        res.status(201).json('new contact has been created' + littleWarmies);
      }
    }catch (error) {
      errorHandling(res, error);
      res.json({ error: 'cannot access with without Token' });
    }
  };
  
  // updating one entry
  const putOrder= async (req, res) => {
    try{
      updateOrders ={
        user_name: req.body.user_name,
        warmie_name: req.body.warmie_name,
        warmie_id: req.body.warmie_id,
        send_date: req.body.send_date,
      }
  
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .replaceOne({_id: userId}, updateOrders);
  
      if (result.modifiedCount > 0) {
        res.status(204).send();
      };
    }catch (error) {
      errorHandling(res, error);
    }
};

//deleting an entry
const delOrder = async (req, res) => {
  try{
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection(collection_name).deleteOne({ _id: userId }, true);
    console.log(response);

    if (response.deletedCount > 0) {
      res.status(200).send();
    }
  }catch (error) {
    errorHandling(res, error);
  }
};

const authorize = async (req, res) => {
  console.log('it went in')
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
}

const logout = async (req, res) => {
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
}


module.exports = {
  getAllOrders,
  newOrder,
  putOrder,
  delOrder,
  authorize,
  logout
};