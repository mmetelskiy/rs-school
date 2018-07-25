const express = require('express');
const requestProcessor = require('./requestprocessor');

const app = express();

app.use(express.json());

app.get('/heartbeat', (req, res) => {
  res
    .status(200)
    .end(Date.now().toString());
});

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get('/users', (req, res) => {
  requestProcessor.getUsers(req, res);
});

app.post('/mentors', (req, res) => {
  requestProcessor.addMentor(req, res);
});

app.get('/students', (req, res) => {
  requestProcessor.getStudents(req, res);
});

const PORT = 8889;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
