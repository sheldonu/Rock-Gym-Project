// Import the function you want to test
const { getAllRoutes } = require('../controller/routes_set');
const mongodb = require('../db/connect');

const getAllRoutesOutput = [
  {
    "_id": "65f9fa1a23b5b93fc0f0e8fd",
    "name": "Crazy Crux",
    "grade": "5.10a",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8de",
    "definition": "Challenging route with a tricky crux section.",
    "color": "red"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e8fe",
    "name": "Vertical Vortex",
    "grade": "5.8",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8de",
    "definition": "A fun vertical climb suitable for all skill levels.",
    "color": "blue"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e8ff",
    "name": "Boulder Bash",
    "grade": "V2",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8de",
    "definition": "Short but intense bouldering problem with dynamic moves.",
    "color": "green"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e900",
    "name": "Slab Symphony",
    "grade": "5.7",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8df",
    "definition": "Easy slab climb perfect for beginners.",
    "color": "yellow"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e901",
    "name": "Overhang Odyssey",
    "grade": "5.12b",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8df",
    "definition": "Advanced climb featuring a challenging overhang section.",
    "color": "orange"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e902",
    "name": "Crack Classic",
    "grade": "5.9",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8df",
    "definition": "Classic crack climb with varied hand and foot placements.",
    "color": "brown"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e903",
    "name": "Dyno Dilemma",
    "grade": "V3",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8e1",
    "definition": "Dynamic moves and jumps characterize this bouldering problem.",
    "color": "purple"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e904",
    "name": "Toprope Tango",
    "grade": "5.6",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8e1",
    "definition": "Gentle climb suitable for beginners, protected by a toprope.",
    "color": "pink"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e905",
    "name": "Ledge Labyrinth",
    "grade": "5.10c",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8e1",
    "definition": "Technical climb with intricate movements around ledges.",
    "color": "gray"
  },
  {
    "_id": "65f9fa1a23b5b93fc0f0e906",
    "name": "Crux Crusher",
    "grade": "5.11a",
    "route_setter_id": "65f9f91c23b5b93fc0f0e8e2",
    "definition": "Challenge yourself with a difficult crux sequence.",
    "color": "black"
  }
]

// Mock MongoDB
jest.mock('../db/connect', () => ({
  getDb: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(getAllRoutesOutput),
        }),
      }),
    }),
  }),
}));

describe('getAllRoutes function', () => {
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
    await getAllRoutes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(getAllRoutesOutput);
  });
});