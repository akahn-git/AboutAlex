const express = require('express')
const app = express()
var db = require("./database.js")

// This function runs when a POST request is made to the route '/like/:projectName'
app.post('/like-project/:projectName', (req, res) => {
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
app.delete('/unlike-project/:projectName', (req, res) => {

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

// This function runs when a GET request is made to the route '/likes/:projectName'
app.get('/likes/:projectName', (req, res) => {
  // Log a message indicating that we have received a request to get the number of likes for the specified project
  console.log(`Received GET request for project: ${req.params.projectName}`);

  // Use the SQLite database to get the number of likes for the specified project
  db.getLikes(req.params.projectName, (err, likes) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting likes for project ${req.params.projectName}: ${err}`);
      res.send({ error: err });
    } else if (likes === 0) {
      // Project has 0 likes, return a special response
      console.log(`Project ${req.params.projectName} has 0 likes`);
      res.send({ message: 'This project has no likes yet.' });
    } else {
      // Query was successful, return the number of likes to the client
      console.log(`Returning ${likes} likes for project ${req.params.projectName}`);
      res.send(JSON.stringify({ likes }));
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
  db.addUser(res, sub, true, (err) => {
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
  db.getUser(res, sub, (err, user) => {
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

// This function runs when a GET request is made to the route '/followed/:sub'
app.get('/followed-projects/:sub', (req, res) => {
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

// This function runs when a POST request is made to the route '/follow/:projectName/:sub'
app.post('/follow-user/:projectId/:sub', (req, res) => {
  // Extract the project name and user sub from the request parameters
  const projectId = req.params.projectId;
  const sub = req.params.sub;

  // Log a message indicating that we have received a request to follow the specified project
  console.log(`Received POST request to follow project: ${projectId}`);

  // Use the SQLite database to add the specified project to the user's list of followed projects
  db.addFollowedProject(sub, projectId, (err) => {
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error adding followed project ${projectId} for user ${sub}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully added followed project ${projectId} for user ${sub}`);
    }
  });
});

// A route to handle unfollowing a project
app.delete('/unfollow-user/:projectId/:sub', (req, res) => {
  const projectId = req.params.projectId;
  const sub = req.params.sub;

  console.log(`Received request to unfollow project with ID ${projectId} from user with ID ${sub}`);

  // Call the removeFollowedProject function with the project ID and user ID
  db.removeFollowedProject(projectId, sub, (err) => {
    if (err) {
      console.error(`Error occurred while unfollowing project: ${err.message}`);
      // If there was an error, return a 500 error to the client
      res.status(500).send({ error: err.message });
    } else {
      console.log(`Successfully unfollowed project with ID ${projectId} for user with ID ${sub}`);
      // If there was no error, return a success message to the client
      res.send({ message: 'Successfully removed project from followed projects!' });
    }
  });
});


app.get('/liked-projects/:sub', (req, res) => {
  // Get the sub from the request parameters
  const sub = req.params.sub;

  // Log a message indicating that we have received a request to get the liked projects for a user
  console.log(`Received GET request to get liked projects for user: ${sub}`);

  // Use the SQLite database to get the liked projects for the specified user
  db.getLikedProjects(sub, (err, liked_projects) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting liked projects for user ${sub}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully got liked projects for user ${sub}`);

      // Log all of the names of the projects liked by the user
      console.log(`Liked projects for user ${sub}: ${liked_projects}`);

      // Return the liked projects in the response
      res.sendStatus(200, { liked_projects });
    }
  });
});

// A route to handle adding a followed project
app.post('/follow-user/:projectId/:sub', (req, res) => {
  console.log("Received request to add a followed project with ID:", req.params.projectId);
  console.log("User ID:", req.params.sub);

  const projectId = req.params.projectId;
  const sub = req.params.sub;

  // Call the addFollowedProject function with the project ID and user ID
  db.addFollowedProject(projectId, sub, (err) => {
    if (err) {
      console.log("Error adding followed project:", err);
      // If there was an error, return a 400 error to the client with a custom error message
      if (err.message.includes("SQLITE_CONSTRAINT")) {
        res.status(400).send({ error: "This project is already being followed by this user." });
      } else {
        res.status(500).send({ error: err.message });
      }
    } else {
      console.log("Successfully added followed project");
      // If there was no error, return a success message to the client
      res.send({ message: 'Successfully added followed project!' });
    }
  });
});


//This route listens for a DELETE request to the /unlike-user/:projectId/:sub path
app.delete('/unlike-user/:projectId/:sub', (req, res) => {
  // Log a message indicating that we have received a request to delete a like for the specified project
  console.log(`Received DELETE request for project with ID ${req.params.projectId} from user with sub ${req.params.sub}`);

  // Use the removeLikedProject function to remove the specified project from the user's liked projects
  db.removeLikedProject(req.params.projectId, req.params.sub, (err) => {
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error removing liked project with ID ${req.params.projectId} for user with sub ${req.params.sub}: ${err}`);
      res.status(500).send({ error: `Error removing liked project: ${err}` });
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully removed liked project with ID ${req.params.projectId} for user with sub ${req.params.sub}`);
      res.send({ message: 'Liked project successfully removed' });
    }
  });
});

//This route listens for a Post request to the /like-user/:projectId/:sub path
app.post('/like-user/:projectId/:sub', (req, res) => {
  const projectId = req.params.projectId;
  const sub = req.params.sub;

  console.log(`Received request to like project with ID ${projectId} from user with ID ${sub}`);

  db.addLikedProject(projectId, sub, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to like project' });
    } else {
      console.log(`Successfully liked project with ID ${projectId} for user with ID ${sub}`);
      res.send({ message: 'Successfully liked project' });
    }
  });
});

// Route to get the number of followers for a specified project
app.get('/follow-project/:projectId', (req, res) => {
  // Log a message indicating that we have received a request to get the number of followers for the specified project
  console.log(`Received GET request for project: ${req.params.projectId}`);

  // Use the SQLite database to get the number of followers for the specified project
  db.getFollowedProjects(req.params.projectId, (err,followers) =>{
    if (err) {
      // Check if the error is due to the user already following the project
      if (err.message.startsWith("Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: followed_projects.user_id, followed_projects.project_id")) {
        // User is already following the project, return a special response
        console.log(`User is already following project ${req.params.projectId}`);
        res.status(200).send({ message: 'You are already following this project.' });
      } else {
        // Handle other errors
        console.error(`Error getting followers for project ${req.params.projectId}: ${err}`);
        res.status(500).send({ error: err });
      }
    } else {
      // Query was successful, return the number of followers to the client
      console.log(`Returning ${followers} followers for project ${req.params.projectId}`);
      res.status(200).send({ followers });
    }
  });
});

app.delete('/unfollow-project/:projectId', (req, res) => {
  // Log a message indicating that we have received a request to unfollow the specified project
  console.log(`Received DELETE request to unfollow project: ${req.params.projectId}`);

  // Use the SQLite database to remove a "follow" from the specified project
  db.removeFollowedProject(req.params.projectId, (err) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error removing follow from project ${req.params.projectId}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully removed follow from project ${req.params.projectId}`);
    }
  });
});

// This function runs when a GET request is made to the route '/followers/:projectName'
app.get('/followers/:projectName', (req, res) => {
  // Log a message indicating that we have received a request to get the number of followers for the specified project
  console.log(`Received GET followers request for project: ${req.params.projectName}`);

  // Use the SQLite database to get the number of follows for the specified project
  db.getFollowers(req.params.projectName, (err, followers) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error getting followers for project ${req.params.projectName}: ${err}`);
      res.send({ error: err });
    } else if (followers === 0) {
      // Project has 0 follows, return a special response
      console.log(`Project ${req.params.projectName} has 0 followers`);
      res.send({ message: 'This project has no followers yet.' });
    } else {
      // Query was successful, return the number of follows to the client
      console.log(`Returning ${followers} followers for project ${req.params.projectName}`);
      res.send(JSON.stringify({ followers }));
    }
  });
});

// This function runs when a POST request is made to the route '/follow-project/:projectName'
app.post('/follow-project/:projectName', (req, res) => {
  // Log a message indicating that we have received a request to follow the specified project
  console.log(`Received POST request to follow project: ${req.params.projectName}`);

  // Use the SQLite database to add a follower to the specified project
  db.addFollower(req.params.projectName, (err) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error adding follower to project ${req.params.projectName}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully added follower to project ${req.params.projectName}`);
    }
  });
});

// This function runs when a DELETE request is made to the route '/unfollow-project/:projectName'
app.delete('/unfollow-project/:projectName', (req, res) => {

  // Log a message indicating that we have received a request to unfollow the specified project
  console.log(`Received DELETE request to unfollow project: ${req.params.projectName}`);

  // Use the SQLite database to remove a follower from the specified project
  db.removeFollower( req.params.projectName, (err) =>{
    if (err) {
      // Handle the error if there was an issue with the database query
      console.error(`Error removing follower from project ${req.params.projectName}: ${err}`);
    } else {
      // Query was successful, log a message to indicate this
      console.log(`Successfully removed follower from project ${req.params.projectName}`);
    }
  });
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));