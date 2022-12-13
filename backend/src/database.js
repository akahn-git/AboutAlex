const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('C:\\Users\\18482\\sqlite3\\aboutalex.db')

// add a new like to the database for a specific project
const addLike = (name, callback) => {
  const sql = 'UPDATE projects SET likes = likes + 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
  if (err) {
    callback(err);
  } 
  else {
    callback(null);
  }
  });
  };

// remove a like to the database for a specific project
const removeLike = (name, callback) => {
  const sql = 'UPDATE projects SET likes = likes - 1 WHERE name = ?';
  db.run(sql, [name], (err) => {
  if (err) {
    callback(err);
  } 
  else {
    callback(null);
  }
  });
  };

// get the likes from the database for a specific project
const getLikes = (name, callback) => {
  const sql = 'SELECT likes FROM projects WHERE name = ?';
  db.get(sql, [name], (err,row) => {
    if (err) {
      callback(err);
    } else {
      callback(null,row.likes);
    }
  });
};

// add a project to the array of followed projects from the database for a user 
const addFollowedProject = (name, sub, callback) => {
  const sql = "UPDATE users SET followed_projects = followed_projects || ',' || ? WHERE sub = ?";
  db.run(sql, [name, sub], (err) => {
  if (err) {
    callback(err);
  } 
  else {
    callback(null);
  }
  });
};

// add a new user to the database
const addUser = (sub, res, callback) => {
  const sql = `INSERT INTO users (sub, followed_projects, liked_projects) VALUES (?, '[]', '[]')`;
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
          // Return the user to the client
          res.send(row);
          callback(null, row);
        }
      });
    }
  });
};



const getUser = (sub, callback) => {
  // First, check if the user already exists in the database
  const sql = 'SELECT * FROM users WHERE sub = ?';
  db.get(sql, [sub], (err, row) => {
    if (err) {
      callback(err);
    } else {
      // If the user does not exist in the database, add the user to the database
      if (!row) {
        const sql = `INSERT INTO users (sub, followed_projects, liked_projects) VALUES (?,'[]', '[]')`;
        
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
                // Return the user to the client
                callback(null, row);
              }
            });
          }
        });
      } else {
        // If the user exists in the database, return the user
        callback(null, row);
      }
    }
  });
};

// get the followed projects of a user from the database
const getFollowedProjects = (sub, callback) => {
  // Check if the user exists in the database
  getUser(sub, (err, row) => {
    if (err) {
      callback(err);
    } else {
      // If the user exists in the database, return their followed projects
      if (row) {
        callback(null, row.followed_projects);
      } else {
        // If the user does not exist, return an empty array of followed projects
        callback(null, []);
      }
    }
  });
};

module.exports = {
  addLike,
  getLikes,
  removeLike,
  addFollowedProject,
  getFollowedProjects,
  addUser,
  getUser,
};