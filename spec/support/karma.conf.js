module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: "../..",
    browsers: ["Chrome"],
    files: ["spec/**/*spec.js"],
    frameworks: ["browserify", "jasmine"],
    logLevel: config.LOG_WARN,
    preprocessors: {
      "spec/**/*spec.js": [ "browserify" ]
    },
    reporters: ["dots"],
    singleRun: true,
  })
}
