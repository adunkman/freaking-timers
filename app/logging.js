module.exports = function (server) {
  server.register({
    register: require("good"),
    options: {
      opsInterval: 1000,
      reporters: [{
        reporter: require("good-console"),
        events: { log: "*", response: "*" }
      }]
    }
  }, function () {});
};
