const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const collection_name = 'routes_set'

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
const getAllRoutes = async (req, res) => {
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
  const getOneRoute= async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .find({ _id: userId });
      // console.log(result);
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }catch (error) {
      errorHandling(res, error);
    }
  };

  // getLogin
const getLogin = async  (req, res) => {
    try{
      logininfo ={
        userName: req.body.username,
        password: req.body.password,
      }
  
      const result = await mongodb
        .getDb()
        .db()
        .collection(collection_name)
        .find({ username: userId, password: password });;
  
      if (result.modifiedCount > 0) {
        res.status(204).send();
      };
    }catch (error) {
      errorHandling(res, error);
    }
  };

// updating route by ID
const updateRoute = async (req, res) => {
  try{
    updateRoute ={
      name: req.body.name,
      grade: req.body.grade,
      route_setter_id: req.body.route_setter_id,
      definition: req.body.definition,
      color: req.body.color
    }

    const routeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection(collection_name)
      .replaceOne({_id: routeId}, updateRoute);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    };
  }catch (error) {
    errorHandling(res, error);
  }
};

// create route
const createRoute = async (req, res) => {
  try{
    const route = {
      name: req.body.name,
      grade: req.body.grade,
      route_setter_id: req.body.route_setter_id,
      definition: req.body.definition,
      color: req.body.color
    };
    const response = await mongodb.getDb().db().collection('routes_set').insertOne(route);
    if (response.acknowledged) {
      res.status(201).json(response);
    };
    }catch (error) {
      errorHandling(res, error);
  }
}

const deleteRoute = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('routes_set').deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
}

  module.exports = {
    getAllRoutes,
    getOneRoute,
    updateRoute,
    getLogin,
    createRoute,
    deleteRoute
  };