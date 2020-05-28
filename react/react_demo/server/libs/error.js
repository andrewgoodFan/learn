const util = require('util');

exports.JsonError = JsonError;
exports.PageError = PageError;

function JsonError(message) {
  Error.call(this, {message});
}
util.inherits(JsonError, Error);

function PageError(message) {
  Error.call(this, {message});
}
util.inherits(PageError, Error);