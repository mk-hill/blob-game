/**
 * Main express file
 * May branch off into other files if necessary
 */

const { exServer: app } = require('../createServers'); // Grab exServer from servers/index.js

module.exports = app;
