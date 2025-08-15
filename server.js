const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const data = require('./data.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/preview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cert.html'));
});

app.get('/cheat/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/user/:regno', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
  const regno = req.params.regno;
  const user = data.find(user => user.regno === regno);
  if (user) {
    res.redirect(`/preview?id=${user.id}`);
  }
  else{
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});