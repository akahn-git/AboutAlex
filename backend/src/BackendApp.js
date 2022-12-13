const express = require('express')
const app = express()
var db = require("./database.js")

// This function runs when a POST request is made to the route '/like/:projectName'
app.post('/like/:projectName', (req, res) => {
  // Log a message indicating that we have received a request for the specified project
  console.log(`Received POST request for project: ${req.params.projectName}`);

  // Use the SQLite database to add a "like" to the specified project
  db.addLike(req.params.projectName, (err) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error adding like to project ${req.params.projectName}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully added like to project ${req.params.projectName}`);
    }
  });
});

// This function runs when a DELETE request is made to the route '/like/:projectName'
app.delete('/like/:projectName', (req, res) => {

  // Log a message indicating that we have received a request to delete a like for the specified project
  console.log(`Received DELETE request for project: ${req.params.projectName}`);

  // Use the SQLite database to remove a "like" from the specified project
  db.removeLike(req.params.projectName, (err) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error removing like from project ${req.params.projectName}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully removed like from project ${req.params.projectName}`);
    }
  });
});


// This function runs when a GET request is made to the route '/like/:projectName'
app.get('/like/:projectName', (req, res) => {

  // Log a message indicating that we have received a request to get the number of likes for the specified project
  console.log(`Received GET request for project: ${req.params.projectName}`);

  // Use the SQLite database to get the number of likes for the specified project
  db.getLikes(req.params.projectName, (err,likes) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting likes for project ${req.params.projectName}: ${err}`);
    } else {
      // Query was successful, return the number of likes to the client
      console.log(`Returning ${likes} likes for project ${req.params.projectName}`);
      res.send({ likes });
    }
  });
});

// This function runs when a POST request is made to the route '/follow/:projectName/:sub'
app.post('/follow/:projectName/:sub', (req, res) => {
  // Extract the project name and user sub from the request parameters
  const projectName = req.params.projectName;
  const sub = req.params.sub;

  // Log a message indicating that we have received a request to follow the specified project
  console.log(`Received POST request to follow project: ${projectName}`);

  // Use the SQLite database to add the specified project to the user's list of followed projects
  db.addFollowedProject(projectName, sub, (err) => {
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error adding followed project ${projectName} for user ${sub}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully added followed project ${projectName} for user ${sub}`);
    }
  });
});


// This function runs when a POST request is made to the route '/user/:sub'
app.post('/user/:sub', (req, res) => {
  // Get the sub from the request body
  const sub = req.params.sub;

  // Log a message indicating that we have received a request to create a new user
  console.log(`Received POST request to create user: ${sub}`);

  // Use the SQLite database to add the new user
  db.addUser(sub, res, (err) => {
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error adding user ${sub}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully added user ${sub}`);
    }
  });
});


// This function runs when a GET request is made to the route '/user/:sub'
app.get('/user/:sub', (req, res) => {
  const sub = req.params.sub;

  // Use the SQLite database to get the user with the specified sub
  db.getUser(sub, (err, user) => {
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting user ${sub}: ${err}`);
    } else {
      // Query was successful, return the user's data
      console.log(`Successfully got user ${sub}`);
      res.send(user);
    }
  });
});


// This function runs when a GET request is made to the route '/user/:sub/followed'
app.get('/user/:sub/followed', (req, res) => {
  // Get the sub from the request parameters
  const sub = req.params.sub;

  // Log a message indicating that we have received a request to get the followed projects for a user
  console.log(`Received GET request to get followed projects for user: ${sub}`);

  // Use the SQLite database to get the followed projects for the specified user
  db.getFollowedProjects(sub, (err,followed_projects) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting followed projects for user ${sub}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully got followed projects for user ${sub}`);

      // Log all of the names of the projects followed by the user
      console.log(`Followed projects for user ${sub}: ${followed_projects}`);

      // Return the followed projects in the response
      res.send({ followed_projects });
    }
  });
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));