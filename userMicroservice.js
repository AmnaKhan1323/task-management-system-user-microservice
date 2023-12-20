const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = {};

// Function to add a user
app.post('/addUser', (req, res) => {
  const { username, email, type } = req.body;
  if (!username || !email || !type) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  users[username] = { username, email, type };
  res.json({ message: 'User added successfully' });
});

// Function to delete a user
app.delete('/deleteUser/:username', (req, res) => {
  const { username } = req.params;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }

  delete users[username];
  res.json({ message: 'User deleted successfully' });
});

// Function to get user information
app.get('/getUser/:username', (req, res) => {
  const { username } = req.params;
  const user = users[username];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.listen(port, () => {
  console.log(`User Microservice listening at http://localhost:${port}`);
});
