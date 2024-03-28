// Import the function you want to testupdateComment
const { getAllComments, getOneComment, updateComment } = require('../controller/climbers_comments.js');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//  all out put stuff and variables
// getall
const getAllCommentsOutput = [
  {
    "_id": "65f9fc2523b5b93fc0f0e90e",
    "message": "Awesome climb!",
    "grade": "5.9",
    "name": "Alice Smith",
    "stars": 5,
    "route_set_id": "65f9fa1a23b5b93fc0f0e8fe"
  },
  {
    "_id": "65f9fc2523b5b93fc0f0e90f",
    "message": "Challenging but fun.",
    "grade": "5.10b",
    "name": "Bob Johnson",
    "stars": 4,
    "route_set_id": "65f9fa1a23b5b93fc0f0e8fd"
  },
  {
    "_id": "65f9fc2523b5b93fc0f0e910",
    "message": "Beautiful scenery!",
    "grade": "5.7",
    "name": "Charlie Brown",
    "stars": 5,
    "route_set_id": "65f9fa1a23b5b93fc0f0e900"
  },
  {
    "_id": "65f9fc2523b5b93fc0f0e911",
    "message": "Tricky crux section.",
    "grade": "5.11c",
    "name": "David Davis",
    "stars": 4,
    "route_set_id": "65f9fa1a23b5b93fc0f0e906"
  }
]
// get one
const singleCommentOutput = [
  {
    "_id": "65f9fc2523b5b93fc0f0e90e",
    "message": "Awesome climb!",
    "grade": "5.9",
    "name": "Alice Smith",
    "stars": 5,
    "route_set_id": "65f9fa1a23b5b93fc0f0e8fe"
  }
];
const getSingleParam = { id: '65f9fc2523b5b93fc0f0e90e' }


// Mock MongoDB
jest.mock('../db/connect', () => ({
  getDb: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(getAllCommentsOutput),
        }),
      }),
    }),
  }),
}));

// testing the get all comments
describe('getAllComments function', () => {
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

  it('should get all comments and return status 200 with JSON', async () => {
    await getAllComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(getAllCommentsOutput);
  });
});

// testing the get one comment
describe('getOneComment function', () => {
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

  it('should get one comment by ID and return status 200 with JSON', async () => {

    // Mock find and toArray to return the single comment
    mongodb.getDb().db().collection().find().toArray.mockResolvedValue(singleCommentOutput);

    await getOneComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleCommentOutput);
  });
});


