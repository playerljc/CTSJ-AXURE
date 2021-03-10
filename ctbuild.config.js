const modifyVars = require('./themes/default/vars');

function isDev(mode) {
  return mode === 'development';
}

function isProd(mode) {
  return mode === 'production';
}

module.exports = {
  getTheme() {
    return modifyVars;
  },
  getConfig({ webpackConfig, webpack, plugins }) {
    if (isDev(webpackConfig.mode)) {
      webpackConfig.module.rules[3].use[3].query.modifyVars = modifyVars;
    } else {
      webpackConfig.module.rules[3].use[4].query.modifyVars = modifyVars;
    }

    // 这块只有需要主题切换的时候才能用到
    const MiniCssExtractPluginIndex = isProd(webpackConfig.mode) ? 3 : 2;
    webpackConfig.plugins[MiniCssExtractPluginIndex] = new plugins.MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
      ignoreOrder: false,
    });

    // 变量的引入
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        CustomEvnVars: {
          mode: JSON.stringify(process.env.mode),
          skin: JSON.stringify(modifyVars),
          environment: JSON.stringify(process.env.environment),
        },
      }),
    );

    webpackConfig.module.rules[2].include.push(/font-awesome.min.css/, /ol.css/);

    if (webpackConfig.mode === 'production') {
      webpackConfig.optimization.splitChunks = {
        // chunks: 'all',
        // minSize: 30000,
        // maxSize: 0,
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: '~',
        // automaticNameMaxLength: 30,
        // name: true,
        chunks: 'all',
        minSize: 20000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          antdesigncompatible: {
            test: /[\\/]node_modules[\\/](@ant-design[\\/]compatible|_@ant-design_compatible)/,
            priority: 1,
            enforce: true,
          },
          antdesignicons: {
            test: /[\\/]node_modules[\\/](@ant-design[\\/]icons|_@ant-design_icons)/,
            priority: 1,
            enforce: true,
          },
          echart: {
            test: /[\\/]node_modules[\\/](echarts-for-react|_echarts-for-react|echarts|_echarts)/,
            priority: 4,
            enforce: true,
          },
          ol: {
            test: /[\\/]node_modules[\\/](ol|_ol|ol-ext|_ol-ext)/,
            priority: 1,
            enforce: true,
          },
          ctsj: {
            test: /[\\/]node_modules[\\/](@ctsj)/,
            priority: 1,
            enforce: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react-intl-universal|_react-intl-universal|react|_react|react-dom|_react-dom|react-router|_react-router|prop-types|_prop-types|history|_history)/,
            priority: 1,
            enforce: true,
          },
          antd: {
            test: /[\\/]node_modules[\\/](antd|_antd|rc|_rc)/,
            priority: 1,
            enforce: true,
          },
          static: {
            test: /[\\/]node_modules[\\/](lodash|_lodash|js-md5|_js-md5|classnames|_classnames|uuid|_uuid|qs|_qs|moment|axios|_axios|_cookie_js|_moment|swiper|_swiper)/,
            priority: 1,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            priority: 0,
            enforce: true,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
  },
};
