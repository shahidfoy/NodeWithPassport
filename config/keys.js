// keys.js  - figure out credentials to return
if (process.env.NODE_ENV === 'production') {
    // uses prod keys
    module.exports = require('./prod');
} else {
    // uses dev keys
    module.exports = require('./dev');
}