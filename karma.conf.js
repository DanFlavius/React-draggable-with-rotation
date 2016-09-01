var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['phantomjs-shim', 'jasmine'],

    files: [
      'specs/main.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/main.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.(?:jsx?|es6)$/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
            },
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"test"'
          }
        })
      ],
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.es6']
      }
    },

    webpackServer: {
      stats: {
        chunks: false,
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS_custom', 'Firefox', process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          viewportSize: {width: 1024, height: 768}
        }
      }
    },

    singleRun: true,

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-phantomjs-shim')
    ]
  });
};
