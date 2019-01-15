// Not agar.io
const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/public`));

const expressServer = app.listen(59768); // todo set env port before deploying

// Binding socket.io to http server
const server = socketio(expressServer);
