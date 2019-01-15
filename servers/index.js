/**
 * Expose servers to outside of /servers
 */

module.exports = {
  exServer: require('./express/main'),
  ioServer: require('./socketio/main'),
};
