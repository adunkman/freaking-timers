var moment = require("moment");
var behaviors = require("./helpers/behaviors");

describe("clock drift", function (done) {
  var timeOfTestInDriftedHawaii = moment().utcOffset("-10:00").add(13, "minutes");

  behaviors.timersAndEntriesSavedCorrectly(timeOfTestInDriftedHawaii);
});
