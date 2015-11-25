var jquery = require("jquery");

module.exports.post = function (params, now, callback) {
  jquery.ajax({
    method: "POST",
    url: "http://localhost:3001/time",
    data: JSON.stringify(params),
    processData: false,
    contentType: "application/json",
    headers: {
      "Request-Date": now.utc().format("ddd, D MMM YYYY HH:mm:ss \\G\\M\\T")
    },
    error: function (xhr, status, err) {
      callback(err || new Error("Unsuccessful response: " + status), {});
    },
    success: function (data) {
      callback(undefined, data);
    }
  });
};
