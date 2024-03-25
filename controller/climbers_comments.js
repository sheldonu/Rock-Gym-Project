const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const collection_name = 'climbers_comment'

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

// getting all the route setters form database
const getAllComments = async (req, res) => {
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

  //getting single one
  const getOneComment = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .find({ _id: userId });
      console.log(result);
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (error) {
      errorHandling(res, error);
    }
  };

  
// updating setter by ID
const updateComment = async (req, res) => {
  try{
    updateComment ={
      message: req.body.message,
      grade: req.body.grade,
      name: req.body.name,
      stars: req.body.stars,
      route_set_id: req.body.route_set_id
    }

    const commentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection(collection_name)
      .replaceOne({_id: commentId}, updateComment);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    };
  }catch (error) {
    errorHandling(res, error);
  }
};


  module.exports = {
    getAllComments,
    getOneComment,
    updateComment
  };