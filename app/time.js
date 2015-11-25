var Joi = require("joi");
var moment = require("moment");
var Entry = require("./models/entry");

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
      var clientDate;
      var entry = new Entry({
        started_at_timestamp: request.payload.started_at_timestamp,
        ended_at_timestamp: request.payload.ended_at_timestamp
      });

      if (request.headers["request-date"]) {
        clientDate = moment
          .utc(request.headers["request-date"], "ddd, D MMM YYYY HH:mm:ss \\G\\M\\T");
      }

      reply({
        spent_at: entry.spentAt(),
        started_at: entry.startedAt(),
        ended_at: entry.endedAt(),
        hours: entry.hours(clientDate)
      });
    }
  });
};
