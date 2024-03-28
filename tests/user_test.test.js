// Import the function you want to test
const { getAllUsers, getOneUser } = require('../controller/user');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUserOutput = [
    {
      "_id": "65f9fc8223b5b93fc0f0e915",
      "name": "John Doe",
      "username": "john_doe123",
      "password": "securePassword123",
      "email": "john.doe@example.com",
      "route_sent_id": [
        "65f9fa1a23b5b93fc0f0e8ff",
        "65f9fa1a23b5b93fc0f0e905",
        "65f9fa1a23b5b93fc0f0e906",
        "65f9fa1a23b5b93fc0f0e901"
      ]
    },
    {
      "_id": "65f9fc8223b5b93fc0f0e916",
      "name": "Alice Smith",
      "username": "alice_smith",
      "password": "strongPass456",
      "email": "alice.smith@example.com",
      "route_sent_id": [
        "65f9fa1a23b5b93fc0f0e8ff"
      ]
    },
    {
      "_id": "65f9fc8223b5b93fc0f0e917",
      "name": "Bob Johnson",
      "username": "bob_johnson789",
      "password": "secretPass789",
      "email": "bob.johnson@example.com",
      "route_sent_id": [
        "65f9fa1a23b5b93fc0f0e8ff",
        "65f9fa1a23b5b93fc0f0e906"
      ]
    },
    {
      "_id": "65f9fc8223b5b93fc0f0e918",
      "name": "Eva Miller",
      "username": "eva_miller",
      "password": "evaSecurePass",
      "email": "eva.miller@example.com",
      "route_sent_id": [
        "65f9fa1a23b5b93fc0f0e901",
        "65f9fa1a23b5b93fc0f0e903",
        "65f9fa1a23b5b93fc0f0e906",
        "65f9fa1a23b5b93fc0f0e905"
      ]
    },
    {
      "_id": "65f9fc8223b5b93fc0f0e919",
      "name": "David Wilson",
      "username": "david_wilson",
      "password": "davidPass123",
      "email": "david.wilson@example.com",
      "route_sent_id": [
        "65f9fa1a23b5b93fc0f0e8ff"
      ]
    }
  ]
// get one
const singleUserOutput = [
  {
    "_id": "65f9fc8223b5b93fc0f0e919",
    "name": "David Wilson",
    "username": "david_wilson",
    "password": "davidPass123",
    "email": "david.wilson@example.com",
    "route_sent_id": [
      "65f9fa1a23b5b93fc0f0e8ff"
    ]
  }
];
const getSingleParam = { id: '65f9fc8223b5b93fc0f0e919' }

// Mock MongoDB
jest.mock('../db/connect', () => ({
  getDb: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(getAllUserOutput),
        }),
      }),
    }),
  }),
}));

describe('getAllUsers function', () => {
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

  it('should get all Users and return status 200 with JSON', async () => {
    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(getAllUserOutput);
  });
});

// testing the get one User
describe('getOneUser function', () => {
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

  it('should get one User by ID and return status 200 with JSON', async () => {

    // Mock find and toArray to return the single User
    mongodb.getDb().db().collection().find().toArray.mockResolvedValue(singleUserOutput);

    await getOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleUserOutput);
  });
});