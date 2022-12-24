const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('C:\\Users\\18482\\sqlite3\\aboutalex.db')

// Add a new like to the database for a specific project
const addLike = (name, callback) => {
  const sql = 'UPDATE projects SET likes = likes + 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Remove a like to the database for a specific project
const removeLike = (name, callback) => {
  const sql = 'UPDATE projects SET likes = likes - 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Get the total number of likes for a project
const getLikes = (name, callback) => {
  const sql = 'SELECT likes FROM projects WHERE name = ?';
  db.get(sql, [name], (err, row) => {
    if (err) {
      callback(err);
    } else {
      callback(null, row.likes);
    }
  });
};

// Changes the value of the appropriate project in followed_projects to true
const addFollowedProject = (userId, projectId, callback) => {
  const sql = 'INSERT INTO followed_projects (user_id, project_id) VALUES (?, ?)';
  db.run(sql, [userId, projectId], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

//get the projects followed by the user
const getFollowedProjects = (sub, callback) => {
  // Query the database to get the IDs of the projects that the user follows
  const sql = 'SELECT project_id FROM followed_projects WHERE user_id = ?';
  db.all(sql, [sub], (err, rows) => {
    if (err) {
      callback(err);
    } else {
      // Return the array of project IDs to the callback function
      const followedProjects = rows.map(row => row.project_id);
      callback(null, followedProjects);
    }
  });
};

//unfollows a project for the user
const removeFollowedProject = (projectId, sub, callback) => {
  // Delete the row from the followed_projects table where the user_id and project_id match the given values
  const sql = 'DELETE FROM followed_projects WHERE user_id = ? AND project_id = ?';
  db.run(sql, [sub, projectId], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

//adds the project liked by the user to the liked_projects TABLE
const addLikedProject = (projectId, sub, callback) => {
  // Check if the user has already liked the project
  const sql = 'SELECT * FROM liked_projects WHERE user_id = ? AND project_id = ?';
  db.get(sql, [sub, projectId], (err, row) => {
    if (err) {
      callback(err);
    } else {
      if (row) {
        // If the user has already liked the project, return an error
        callback(new Error('User has already liked this project'));
      } else {
        // If the user has not yet liked the project, insert a new row into the liked_projects table
        const sql = 'INSERT INTO liked_projects (user_id, project_id) VALUES (?, ?)';
        const values = [sub, projectId];
        db.run(sql, values, (err) => {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      }
    }
  });
};

//get the projects liked by the user
const getLikedProjects = (sub, callback) => {
  // Query the database to get the IDs of the projects that the user follows
  const sql = 'SELECT project_id FROM liked_projects WHERE user_id = ?';
  db.all(sql, [sub], (err, rows) => {
    if (err) {
      callback(err);
    } else {
      // Return the array of project IDs to the callback function
      const followedProjects = rows.map(row => row.project_id);
      callback(null, followedProjects);
    }
  });
};

//remove a liked project for a user
const removeLikedProject = (projectId, sub, callback) => {
  const sql = 'DELETE FROM liked_projects WHERE user_id = ? AND project_id = ?';
  db.run(sql, [sub, projectId], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// add a new user to the database
const addUser = (res, sub, isStandalone, callback) => {
  
  const sql = `INSERT INTO users (sub) VALUES (?)`;
  db.run(sql, [sub], (err) => {
    if (err) {
      callback(err);
    } else {
      // Query the database to get the newly created user
      const sql = 'SELECT * FROM users WHERE sub = ?';
      db.get(sql, [sub], (err, row) => {
        if (err) {
          callback(err);
        } else {
          // Return the user to the client if the function is being called as a standalone function
          if (isStandalone) {
            res.send(row);
            headersSent = true;
          }
          // Return the user data to the getUser function if the function is being called as part of getUser
          callback(null, row);
        }
      });
    }
  });
};


//get the user from the data base with that sub
const getUser = (res, sub, callback) => {
  // First, check if the user already exists in the database
  const sql = 'SELECT * FROM users WHERE sub = ?';
  db.get(sql, [sub], (err, row) => {
    if (err) {
      callback(err);
    } else {
      // If the user does not exist in the database, add the user using the addUser function
      if (!row) {
        addUser(res, sub, false, (err, user) => {
          if (err) {
            callback(err);
          } else {
            // Return the newly created user
            callback(null, user);
          }
        });
      } else {
        // If the user exists in the database, return the user
        callback(null, row);
      }
    }
  });
};

// Add a new follower to the database for a specific project
const addFollower = (name, callback) => {
  const sql = 'UPDATE projects SET followers = followers + 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Get the total number of followers for a project
const getFollowers = (name, callback) => {
  const sql = 'SELECT followers FROM projects WHERE name = ?';
  db.get(sql, [name], (err, row) => {
    if (err) {
      callback(err);
    } else {
      callback(null, row.followers);
    }
  });
};

// Remove a follower from the database for a specific project
const removeFollower = (name, callback) => {
  const sql = 'UPDATE projects SET followers = followers - 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = {
  addLike,
  getLikes,
  removeLike,
  addFollower,
  getFollowers,
  removeFollower,
  addLikedProject,
  getLikedProjects,
  removeLikedProject,
  addFollowedProject,
  getFollowedProjects,
  removeFollowedProject,
  addUser,
  getUser,
};