/**
 * Create and export express and socket.io servers
 * for use in /servers
 */

const express = require('express');
const socketio = require('socket.io');
const helmet = require('helmet');

const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(helmet());

const expressServer = app.listen(59768); // todo set env port before deploying

// Bind socket.io to http server
const server = socketio(expressServer);

module.exports = {
  exServer: app,
  ioServer: server,
};
