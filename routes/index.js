const postApi = require('./post');
const guestApi = require('./guest');

function api(server) {
  server.use('/api/v1/post', postApi);
  server.use('/api/v1/guest', guestApi);
}

module.exports = api;
