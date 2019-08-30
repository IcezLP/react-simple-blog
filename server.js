const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { PORT, DB } = require('./config');

const server = express();
const api = require('./routes');

// Mongoose params
const dbParams = {
  useNewUrlParser: true,
};

// MongoDB connection
mongoose.connect(DB, dbParams, (err) => {
  if (err) {
    console.error('Database connection failed', err);
  } else {
    console.log('Database connection successful');
  }
});

// Body-parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

api(server);

// Render compiled react in production
if (process.env.NODE_ENV === 'production') {
  server.use(express.static('build'));

  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
