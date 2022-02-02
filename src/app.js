const express = require('express');
const app = express();

// contacts:
const contacts = require('./contacts');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile('index.html');
});

app.get('/contacts', (req, res) => {
  res.status(200).send(contacts);
});

app.listen(3000, () => {
  console.log('🚀 Server up and running on port 3000');
});
