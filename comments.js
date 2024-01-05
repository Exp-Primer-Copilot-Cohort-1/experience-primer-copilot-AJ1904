// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
// Use body parser
app.use(bodyParser.json());
// Use cors
app.use(cors());

const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  // Get comments
  const comments = commentsByPostId[req.params.id] || [];
  // Add comment
  comments.push({ id: commentId, content });
  // Update comments
  commentsByPostId[req.params.id] = comments;
  // Send response
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});