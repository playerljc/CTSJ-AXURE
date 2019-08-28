const path = require('path');

module.exports = {
  getConfig(config) {
    const devServer = Object.assign({}, config.devServer);
    devServer.port = 8006;
    return {
      entry: {
        index: path.join(__dirname, 'src', 'index.jsx'),
      },
      devServer,
      // resolve: {
      //   alias: {
      //     '@ctsj/ui-drag': path.resolve(__dirname, 'src/ctsj-ui-drag'),
      //   },
      // },
    };
  },
};
