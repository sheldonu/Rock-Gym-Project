const comments = require('../controller/user.js')

describe("testing the get all function", () => {
    test("This should get all database items in the database", () => {
  
      const output = [{"_id":"65f9fc2523b5b93fc0f0e90e","message":"Awesome climb!","grade":"5.9","name":"Alice Smith","stars":5,"route_set_id":"65f9fa1a23b5b93fc0f0e8fe"},{"_id":"65f9fc2523b5b93fc0f0e90f","message":"Challenging but fun.","grade":"5.10b","name":"Bob Johnson","stars":4,"route_set_id":"65f9fa1a23b5b93fc0f0e8fd"},{"_id":"65f9fc2523b5b93fc0f0e910","message":"Beautiful scenery!","grade":"5.7","name":"Charlie Brown","stars":5,"route_set_id":"65f9fa1a23b5b93fc0f0e900"},{"_id":"65f9fc2523b5b93fc0f0e911","message":"Tricky crux section.","grade":"5.11c","name":"David Davis","stars":3,"route_set_id":"65f9fa1a23b5b93fc0f0e906"}];

      expect(comments.getAllComments()).toEqual(output);
    });
});