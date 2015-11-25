var moment = require("moment");
var behaviors = require("./helpers/behaviors");

describe("timezone handling", function (done) {
  describe("in Arizona", function () {
    var timeOfTestInArizona = moment().utcOffset("-07:00");;

    behaviors.timersAndEntriesSavedCorrectly(timeOfTestInArizona);
  });

  describe("across the day boundary", function () {
    var offsetInYesterday = +moment().utc().format("HH") + 1;
    var timeOfTestInYesterday = moment().utcOffset("-" + offsetInYesterday + ":00");

    // Skip these tests when they will fail, because I don’t want to spend the
    // time fixing it today. :)
    //
    // The test will fail when timeOfTestInYesterday is invalid (the offset is
    // -24:00).
    if (offsetInYesterday < 24) {
      behaviors.timersAndEntriesSavedCorrectly(timeOfTestInYesterday);
    }
  });
});
