var moment = require("moment");
var behaviors = require("./helpers/behaviors");

describe("basic timer", function (done) {
  var timeOfTestInUTC = moment().utc();

  behaviors.timersAndEntriesSavedCorrectly(timeOfTestInUTC);
});
