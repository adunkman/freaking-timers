var Hapi = require("hapi");

module.exports = function (port) {
  var server = new Hapi.Server();
  server.connection({ port: port });

  require("./time")(server);

  return server;
};

if (require.main === module) {
  var server = module.exports(process.env.PORT || 3000);

  require("./logging")(server);

  server.start(function () {
    console.log("Server running at:", server.info.uri);
  });
}
