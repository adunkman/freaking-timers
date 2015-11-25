var Joi = require("joi");
var moment = require("moment");

module.exports = function (server) {
  server.route({
    method: 'POST',
    path: '/time',
    config: {
      cors: {
        additionalHeaders: [ 'Request-Date' ]
      },
      validate: {
        payload: {
          started_at_timestamp: Joi.string().isoDate().required(),
          ended_at_timestamp: Joi.string().isoDate().optional(),
        }
      }
    },
    handler: function (request, reply) {
      var requestedOffset = moment.parseZone(request.payload.started_at_timestamp).utcOffset();
      var startedAt = moment(request.payload.started_at_timestamp, moment.ISO_8601).utcOffset(requestedOffset);
      var endedAt = request.payload.ended_at_timestamp ? moment(request.payload.ended_at_timestamp, moment.ISO_8601).utcOffset(requestedOffset) : null;
      var now = request.headers["request-date"] ? moment.utc(request.headers["request-date"], "ddd, D MMM YYYY HH:mm:ss \\G\\M\\T") : moment();

      if (!now.isValid()) {
        now = moment();
      }

      now.utcOffset(requestedOffset);

      reply({
        spent_at: startedAt.format("YYYY-MM-DD"),
        started_at: startedAt.format("h:mma"),
        ended_at: endedAt ? endedAt.format("h:mma") : null,
        hours: endedAt ?
          +endedAt.diff(startedAt, "hours", true).toFixed(2) :
          +now.diff(startedAt, "hours", true).toFixed(2),
      });
    }
  });
};
