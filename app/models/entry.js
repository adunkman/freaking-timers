var Backbone = require("backbone");
var moment = require("moment");

var Entry = module.exports = Backbone.Model.extend({
  utcOffset: function () {
    return moment
      .parseZone(this.get("started_at_timestamp"))
      .utcOffset();
  },

  spentAt: function () {
    return moment(this.get("started_at_timestamp"), moment.ISO_8601)
      .utcOffset(this.utcOffset())
      .format("YYYY-MM-DD");
  },

  startedAt: function () {
    return moment(this.get("started_at_timestamp"), moment.ISO_8601)
      .utcOffset(this.utcOffset())
      .format("h:mma");
  },

  endedAt: function () {
    var ended_at_timestamp = this.get("ended_at_timestamp");

    if (ended_at_timestamp) {
      return moment(ended_at_timestamp, moment.ISO_8601)
        .utcOffset(this.utcOffset())
        .format("h:mma");
    }
    else {
      return null;
    }
  },

  hours: function (now) {
    var started_at_timestamp = this.get("started_at_timestamp");
    var ended_at_timestamp = this.get("ended_at_timestamp");

    var started_at = moment(this.get("started_at_timestamp"), moment.ISO_8601);

    if (ended_at_timestamp) {
      return +moment(ended_at_timestamp, moment.ISO_8601)
        .utcOffset(this.utcOffset())
        .diff(started_at, "hours", true)
        .toFixed(2);
    }
    else {
      return +(now || moment())
        .utcOffset(this.utcOffset())
        .diff(started_at, "hours", true)
        .toFixed(2);
    }
  }
});
