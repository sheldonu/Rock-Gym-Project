const db = require('/db/connect');

// tables are:
// route_setter - name, username, password, email, phone number
async function createRouteSetter(db){
    try{
        const usersCollection = db.createCollection("route_setter")

        // mock up data for the database
        const routeSetterData = [
            {
            name: 'John Doe',
            username: 'john_doe',
            password: 'securepassword1',
            email: 'john.doe@example.com',
            phoneNumber: '123-456-7890',
            },
            {
            name: 'Alice Smith',
            username: 'alice_smith',
            password: 'securepassword2',
            email: 'alice.smith@example.com',
            phoneNumber: '987-654-3210',
            },
            {
            name: 'Bob Johnson',
            username: 'bob_johnson',
            password: 'securepassword3',
            email: 'bob.johnson@example.com',
            phoneNumber: '555-123-4567',
            },
            {
            name: 'Emily Davis',
            username: 'emily_davis',
            password: 'securepassword4',
            email: 'emily.davis@example.com',
            phoneNumber: '111-222-3333',
            },
            {
            name: 'Michael Wilson',
            username: 'michael_wilson',
            password: 'securepassword5',
            email: 'michael.wilson@example.com',
            phoneNumber: '999-888-7777',
            },
        ];

        //   inserting all the data into the database
        const result = await usersCollection.insertMany(routeSetterData);
        console.log(`${result.insertedCount} users inserted successfully`);
        console.log('Inserted IDs:', result.insertedIds);
    }catch (error){
        console.error('Error inserting users:', error);
    }
};

// routes_set - name, grade, route_setter_id, color, definition
async function createRoutesSet(db){
    try{
        const routeSetterCollecation = db.createCollection("route_set")

        // getting the setters ids
        const routeSetter = db.model('route_setter');
        const ids = await routeSetter.find({}, '_id');
        console.log(ids)
        routeSetterId={
            setter1: ids[0],
            setter2: ids[1],
            setter3: ids[2],
            setter4: ids[3],
            setter5: ids[4],
        }
        // the data
        const mockClimbingRoutes = [
            {
              name: 'Crazy Crux',
              grade: '5.10a',
              route_setter_id: routeSetterId.setter1,
              definition: 'Challenging route with a tricky crux section.',
              color: 'red',
            },
            {
              name: 'Vertical Vortex',
              grade: '5.8',
              route_setter_id: routeSetterId.setter1,
              definition: 'A fun vertical climb suitable for all skill levels.',
              color: 'blue',
            },
            {
              name: 'Boulder Bash',
              grade: 'V2',
              route_setter_id: routeSetterId.setter1,
              definition: 'Short but intense bouldering problem with dynamic moves.',
              color: 'green',
            },
            {
              name: 'Slab Symphony',
              grade: '5.7',
              route_setter_id: routeSetterId.setter2,
              definition: 'Easy slab climb perfect for beginners.',
              color: 'yellow',
            },
            {
              name: 'Overhang Odyssey',
              grade: '5.12b',
              route_setter_id: routeSetterId.setter3,
              definition: 'Advanced climb featuring a challenging overhang section.',
              color: 'orange',
            },
            {
              name: 'Crack Classic',
              grade: '5.9',
              route_setter_id: routeSetterId.setter4,
              definition: 'Classic crack climb with varied hand and foot placements.',
              color: 'brown',
            },
            {
              name: 'Dyno Dilemma',
              grade: 'V3',
              route_setter_id: routeSetterId.setter5,
              definition: 'Dynamic moves and jumps characterize this bouldering problem.',
              color: 'purple',
            },
            {
              name: 'Toprope Tango',
              grade: '5.6',
              route_setter_id: routeSetterId.setter5,
              definition: 'Gentle climb suitable for beginners, protected by a toprope.',
              color: 'pink',
            },
            {
              name: 'Ledge Labyrinth',
              grade: '5.10c',
              route_setter_id: routeSetterId.setter5,
              definition: 'Technical climb with intricate movements around ledges.',
              color: 'gray',
            },
            {
              name: 'Crux Crusher',
              grade: '5.11a',
              route_setter_id: routeSetterId.setter2,
              definition: 'Challenge yourself with a difficult crux sequence.',
              color: 'black',
            },
        ];

         //   inserting all the data into the database
         const result = await routeSetterCollecation.insertMany('mockClimbingRoutes');
         console.log(`${result.insertedCount} users inserted successfully`);
         console.log('Inserted IDs:', result.insertedIds);


    }catch(error){

    }
    db.createCollection("your_collection")
    db.your_collection.insert({ key: "value" })
}

// climbers_comment - message, grade, name, stars
async function createClimberComment(db){
    try{
        const climberComment = db.createCollection("climbers_comment")
        // getting the routes ids
        const routes = db.model('route_set');
        const ids = await routes.find({}, '_id');
        const routes_id = {
            route1: ids[0],
            route2: ids[1],
            route3: ids[2],
            route4: ids[3],
        }

        const climberCommentData = [
            {
            comment_id: 1,
            message: 'Awesome climb!',
            grade: '5.9',
            name: 'Alice Smith',
            stars: 5,
            route_set_id: routes_id.route1,
            },
            {
            comment_id: 2,
            message: 'Challenging but fun.',
            grade: '5.10b',
            name: 'Bob Johnson',
            stars: 4,
            route_set_id: routes_id.route2,
            },
            {
            comment_id: 3,
            message: 'Beautiful scenery!',
            grade: '5.7',
            name: 'Charlie Brown',
            stars: 5,
            route_set_id: routes_id.route3,
            },
            {
            comment_id: 4,
            message: 'Tricky crux section.',
            grade: '5.11c',
            name: 'David Davis',
            stars: 3,
            route_set_id: routes_id.route4,
            },
        ];

        //   inserting all the data into the database
        const result = await climberComment.insertMany(climberCommentData);

        console.log(`${result.insertedCount} comments inserted successfully`);
        console.log('Inserted IDs:', result.insertedIds);
      }catch (error){
          console.error('Error inserting users:', error);
      }

}

// Climbers_account - name, username, password, email, ticks(route_set_id)
async function createClimberAccount(db){

  try{
    const climbersAccount = db.createCollection("climbers_account")
    // getting the routes ids
    const routes = db.model('route_set');
    const ids = await routes.find({}, '_id');
    const routes_id = {
        route1: ids[0],
        route2: ids[1],
        route3: ids[2],
        route4: ids[3],
        route5: ids[4],
        route6: ids[5],
        route7: ids[6],
    }

    const climberCommentData = [
      {
        "name": "John Doe",
        "username": "john_doe123",
        "password": "securePassword123",
        "email": "john.doe@example.com",
        "route_set_id": [routes_id.route1, routes_id.route2, routes_id.route3, routes_id.route4]
      },
      {
        "name": "Alice Smith",
        "username": "alice_smith",
        "password": "strongPass456",
        "email": "alice.smith@example.com",
        "route_set_id": [routes_id.route1]
      },
      {
        "name": "Bob Johnson",
        "username": "bob_johnson789",
        "password": "secretPass789",
        "email": "bob.johnson@example.com",
        "route_set_id": [routes_id.route1, routes_id.route4]
      },
      {
        "name": "Eva Miller",
        "username": "eva_miller",
        "password": "evaSecurePass",
        "email": "eva.miller@example.com",
        "route_set_id": [routes_id.route5, routes_id.route6, routes_id.route7, routes_id.route4]
      },
      {
        "name": "David Wilson",
        "username": "david_wilson",
        "password": "davidPass123",
        "email": "david.wilson@example.com",
        "route_set_id": [routes_id.route4]
      }
    ];


    //   inserting all the data into the database
    const result = await climbersAccount.insertMany(climberCommentData);

    console.log(`${result.insertedCount} comments inserted successfully`);
    console.log('Inserted IDs:', result.insertedIds);
  }catch (error){
      console.error('Error inserting users:', error);
  }
}

// Initialize the database connection
db.initDb((err, client) => {
  if (err) {
    console.error('Error initializing database:', err);
  } else {
    console.log('Database initialized successfully');
    // Now you can use db.getDb() to get the database connection
    const database = db.getDb();
    // Your code using the database connection goes here

    createRouteSetter(database)
    // createRoutesSet(database)
    // createClimberComment(database)
    // createClimberAccount(database)
  }
});

