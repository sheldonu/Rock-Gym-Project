const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const collection_name = 'route_setter'

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
const getAllRouteSetters = async (req, res) => {
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
  const getOneRouteSetter= async (req, res) => {
    try {
      const setterId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .find({ _id: setterId });
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
const updateRouteSetters = async (req, res) => {
  try{
    updateSetter ={
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }

    const setterId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection(collection_name)
      .replaceOne({_id: setterId}, updateSetter);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    };
  }catch (error) {
    errorHandling(res, error);
  }
};

// create setter
const createSetter = async (req, res) => {
  try{
    const setter = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    };
    const response = await mongodb.getDb().db().collection('route_setter').insertOne(setter);
    if (response.acknowledge) {
      res.status(201).json(response);
    };
    }catch (error) {
      errorHandling(res, error);
  }
};

const deleteSetter = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('route_setter').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

module.exports = {
  getAllRouteSetters,
  getOneRouteSetter,
  updateRouteSetters,
  createSetter,
  deleteSetter
};