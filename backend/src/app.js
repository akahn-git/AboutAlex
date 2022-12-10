const express = require('express')
const app = express()
var db = require("./database.js")

// configure a template renderer
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

// configure a router for the application
const router = express.Router()
router.get('/', (req, res) => {
  // render 'views/index.ejs'
  //   - under the hood, the mapping from
  //     - index.ejs -> src/views/index.ejs
  //   - is configured on lines 7/8
  res.render('view.ejs')
});

// use the router middleware for the application
app.use(router)

// start the webserver listening
//  - on port 3000
app.listen(3000)

// this request handler is for when the user clicks the like button
//
// if i went to alexkahn.com/like/my_first_post, the server would log "my_first_post"
// if you hooked the like button up to send a request to alexkahn.com/like/my_first_post
// this function would run
app.post('/like/:postId', (req, res) => {
  // you can yoink out the post id from the parameters like this
  console.log(req.params.postId);

  // hook up sqlite to increment "like" count on the post for req.params.postId
  // https://expressjs.com/en/guide/database-integration.html#sqlite 
});

// this request will get the number of likes for a given post, so
// it can be displayed by the browser
app.get('/like/:postId', (req, res) => {
  // you can yoink out the post id from the parameters like this
  console.log(req.params.postId);

  // hook up sqlite to fetch "like" count on the post for req.params.postId
  // https://expressjs.com/en/guide/database-integration.html#sqlite
});