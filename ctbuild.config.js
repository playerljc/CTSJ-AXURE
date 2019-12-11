const path = require('path');

module.exports = {
  getConfig({ curModule, plugins, define }) {
    if (curModule.mode === 'development') {
      curModule.devServer.port = 8006;
    }
    curModule.entry.index = path.join(__dirname, 'src', 'index.jsx');

    // curModule.plugins.push(
    //   new plugins.HtmlWebpackIncludeAssetsPlugin({
    //     assets: [path.join('assets', 'lodash.min.js')],
    //     append: false,
    //     hash: true,
    //   })
    // );
    //
    // curModule.plugins.push(
    //   new plugins.HtmlWebpackIncludeAssetsPlugin({
    //     assets: [path.join('assets', 'jquery-3.1.0.js')],
    //     append: false,
    //     hash: true,
    //   })
    // );
    //
    // curModule.plugins.push(
    //   new plugins.CopyWebpackPlugin([
    //     {
    //       from: path.join(__dirname, 'assets'),
    //       to: 'assets',
    //       toType: 'dir',
    //     },
    //   ])
    // );
    //
    // curModule.externals = {
    //   lodash: '_',
    //   jquery: 'jQuery',
    // };
  },
};
