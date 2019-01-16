/**
 * Expose servers to outside of /servers
 */

module.exports.exServer = require('./express/main');
module.exports.ioServer = require('./socketio/main');
