// Import the function you want to test
const { getAllComments } = require('../controller/climbers_comments.js');
const mongodb = require('../db/connect');

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