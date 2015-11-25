var spawn = require("child_process").spawn;
var server = require("../../app/server")(3001);

server.start(function (err) {
  if (err) {
    console.error("Unable to start test server:", err);
    server.stop(function () {});
    return;
  }

  var karma = spawn("./node_modules/.bin/karma", ["start", "spec/support/karma.conf.js"]);

  karma.stdout.pipe(process.stdout);
  karma.stderr.pipe(process.stderr);

  karma.on("exit", function () {
    server.stop(function () {});
  });
});
