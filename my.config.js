// Karma configuration
// Generated on Sun Oct 25 2015 12:03:33 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //{pattern: 'src/main/resources/static/js/*.js', included: false},
      //{pattern: 'src/main/resources/static/js/**/*.js', included: false},
      //{pattern: 'src/test/resources/static/js/*.js', included: false},
      //{pattern: 'src/test/resources/static/js/**/*.js', included: false}
	  'target/generated-resources/static/js/angular.js',
	  'target/generated-resources/static/js/angular-mocks.js',
	  'src/main/resources/static/js/components/expenses/expenses.module.js',
	  'src/main/resources/static/js/components/expenses/expenses.js',
	  'src/main/resources/static/js/components/core/dataservice.js',
	  'src/test/resources/static/js/spec.js',
	  'src/test/resources/static/js/specHelper.js',
	  'src/test/resources/static/js/specController.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
	  'src/main/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
