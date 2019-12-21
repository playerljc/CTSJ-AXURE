const path = require('path');
const HappyPack = require('happypack');
const modifyVars = require('./system/modifyVars');

module.exports = {
  getConfig({ webpack, curModule, plugins }) {
    if (curModule.mode === 'development') {
      curModule.devServer.port = 8006;
    }
    curModule.entry.index = path.join(__dirname, 'src', 'index.jsx');

    const { LessPluginCleanCSS, LessPluginAutoPrefix } = plugins;

    curModule.plugins.splice(6, 1);
    // Less
    curModule.plugins.push(
      new HappyPack({
        id: 'less',
        loaders: [
          'cache-loader',
          'css-loader',
          {
            loader: 'less-loader',
            query: {
              javascriptEnabled: true,
              modifyVars,
              plugins: [
                new LessPluginCleanCSS({ advanced: true }),
                new LessPluginAutoPrefix({ add: false, remove: false, browsers: ['last 2 versions']}),
              ],
            },
          },
        ],
      }),
    );

    // Define
    curModule.plugins.push(new webpack.DefinePlugin({
      process: {
        skin: JSON.stringify(modifyVars),
      },
    }));

    curModule.optimization.splitChunks = {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        static: {
          test: /[\\/]node_modules[\\/](_cookie_js|_moment)/,
          priority: 1,
          enforce: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](_react|_react-dom|_react-router|_prop-types|_history)/,
          priority: 1,
          enforce: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/](_antd|_rc)/,
          priority: 1,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
          enforce: true,
        },
        common: {
          priority: 4,
          minChunks: 2,
          reuseExistingChunk: true,
        },

        uiwebbusiness: {
          test: /[\\/]UIWeb[\\/]Business[\\/]/,
          priority: 2,
          enforce: true,
        },
        uiwebcomponents: {
          test: /[\\/]UIWeb[\\/]Components[\\/]/,
          priority: 2,
          enforce: true,
        },
        uiweblayout: {
          test: /[\\/]UIWeb[\\/]Layout[\\/]/,
          priority: 2,
          enforce: true,
        },
        uiwebutil: {
          test: /[\\/]UIWeb[\\/]Util[\\/]/,
          priority: 2,
          enforce: true,
        },
        uiweb: {
          test: /[\\/]UIWeb[\\/]/,
          priority: 1,
          enforce: true,
        },

        vendors: false,
        default: false,
      },
    };
  },
};
