const path = require('path');

module.exports = {
  getConfig({ curModule }) {
    curModule.devServer.port = 8006;
    curModule.entry.index = path.join(__dirname, 'src', 'index.jsx');
  },
};
