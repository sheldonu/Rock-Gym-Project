const setter = require('../controller/setter.js')

describe("testing the get all function", () => {
    test("This should get all database items in the database", () => {

      const output = [
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
      expect(setter.getAllRouteSetters()).toEqual(output);
    });
});

describe("testing the get one by id function", () => {
    test("This should get one item in the database and show all of that item", () => {
        const input = ['65f9f91c23b5b93fc0f0e8de', '65f9f91c23b5b93fc0f0e8df']
        const output = [
            {
              "_id": "65f9f91c23b5b93fc0f0e8de",
              "name": "John Doe",
              "username": "john_doe",
              "password": "securepassword1",
              "email": "john.doe@example.com",
              "phoneNumber": "123-456-7890"
            }, {
                "_id": "65f9f91c23b5b93fc0f0e8df",
                "name": "Alice Smith",
                "username": "alice_smith",
                "password": "securepassword2",
                "email": "alice.smith@example.com",
                "phoneNumber": "987-654-3210"
              }
          ]

      expect(setter.getOneRouteSetter(input)).toEqual(output);
    });
});