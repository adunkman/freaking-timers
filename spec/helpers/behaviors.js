var rest = require("./rest");

module.exports.timersAndEntriesSavedCorrectly = function (now) {
  it("parses a running timer correctly", function (done) {
    var oneHourAgo = now.clone().subtract(1, "hour");
    var params = {
      started_at_timestamp: oneHourAgo.format()
    };

    rest.post(params, now, function (err, json) {
      expect(err).toBe(undefined);
      expect(json.spent_at).toBe(oneHourAgo.format("YYYY-MM-DD"));
      expect(json.started_at).toBe(oneHourAgo.format("h:mma"));
      expect(json.ended_at).toBe(null);
      expect(json.hours).toBe(1);
      done();
    });
  });

  it("parses an entry correctly", function (done) {
    var twoHoursAgo = now.clone().subtract(2, "hours");
    var oneHourAgo = now.clone().subtract(1, "hour");
    var params = {
      started_at_timestamp: twoHoursAgo.format(),
      ended_at_timestamp: oneHourAgo.format()
    };

    rest.post(params, now, function (err, json) {
      expect(err).toBe(undefined);
      expect(json.spent_at).toBe(twoHoursAgo.format("YYYY-MM-DD"));
      expect(json.started_at).toBe(twoHoursAgo.format("h:mma"));
      expect(json.ended_at).toBe(oneHourAgo.format("h:mma"));
      expect(json.hours).toBe(1);
      done();
    });
  });
};
