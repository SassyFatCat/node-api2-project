const express = require('express');
const Posts = require('./data/db.js');

// SERVER
const server = express();

// ROUTERS
const postsRouter = require('./posts/posts-router.js');

// ABLE TO READ JSON
server.use(express.json());

// USING ROUTERS
server.use('/api/posts', postsRouter);

// TEST THE API
server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
});

// LISTEN TO REQUESTS
server.listen(5000, () => {
    console.log('\n*** Server Running on http://localhost:5000 ***\n')
});
  