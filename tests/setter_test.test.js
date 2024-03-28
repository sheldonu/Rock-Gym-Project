// Import the function you want to test
const { getAllRouteSetters, getOneRouteSetter } = require('../controller/setter');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllSetterOutput = [
    {
      "_id": "65f9f91c23b5b93fc0f0e8de",
      "name": "John Doe",
      "username": "john_doe",
      "password": "securepassword1",
      "email": "john.doe@example.com",
      "phoneNumber": "123-456-7890"
    },
    {
      "_id": "65f9f91c23b5b93fc0f0e8df",
      "name": "Alice Smith",
      "username": "alice_smith",
      "password": "securepassword2",
      "email": "alice.smith@example.com",
      "phoneNumber": "987-654-3210"
    },
    {
      "_id": "65f9f91c23b5b93fc0f0e8e0",
      "name": "Bob Johnson",
      "username": "bob_johnson",
      "password": "securepassword3",
      "email": "bob.johnson@example.com",
      "phoneNumber": "555-123-4567"
    },
    {
      "_id": "65f9f91c23b5b93fc0f0e8e1",
      "name": "Emily Davis",
      "username": "emily_davis",
      "password": "securepassword4",
      "email": "emily.davis@example.com",
      "phoneNumber": "111-222-3333"
    },
    {
      "_id": "65f9f91c23b5b93fc0f0e8e2",
      "name": "Michael Wilson",
      "username": "michael_wilson",
      "password": "securepassword5",
      "email": "michael.wilson@example.com",
      "phoneNumber": "999-888-7777"
    }
  ]
// get one
const singleRouteSetterOutput = [
  {
    "_id": "65f9f91c23b5b93fc0f0e8e2",
    "name": "Michael Wilson",
    "username": "michael_wilson",
    "password": "securepassword5",
    "email": "michael.wilson@example.com",
    "phoneNumber": "999-888-7777"
  }
];
const getSingleParam = { id: '65f9f91c23b5b93fc0f0e8e2' }

// Mock MongoDB
jest.mock('../db/connect', () => ({
  getDb: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(getAllSetterOutput),
        }),
      }),
    }),
  }),
}));

describe('getAllRouteSetters function', () => {
  // Mock Express' req and res objects
  const req = {};
  let res;

  beforeEach(() => {
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(), // To allow chaining
      json: jest.fn(),
    };
  });

  it('should get all RouteSetters and return status 200 with JSON', async () => {
    await getAllRouteSetters(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(getAllSetterOutput);
  });
});

// testing the get one RouteSetter
describe('getOneRouteSetter function', () => {
  // Mock Express' req and res objects
  const req = { params: getSingleParam };
  let res;

  beforeEach(() => {
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(), // To allow chaining
      json: jest.fn(),
    };
  });

  it('should get one RouteSetter by ID and return status 200 with JSON', async () => {

    // Mock find and toArray to return the single RouteSetter
    mongodb.getDb().db().collection().find().toArray.mockResolvedValue(singleRouteSetterOutput);

    await getOneRouteSetter(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleRouteSetterOutput);
  });
});