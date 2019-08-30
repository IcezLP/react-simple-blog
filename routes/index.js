const postApi = require('./post');

function api(server) {
  server.use('/api/v1/post', postApi);
}

module.exports = api;
