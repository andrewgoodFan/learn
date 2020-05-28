const token = require('jsonwebtoken');
const baseConfig = require('../config');
module.exports = function (load = {}) {
    return token.sign(load, baseConfig.TOKEN_SECRET, {expiresIn: '2h'})
}