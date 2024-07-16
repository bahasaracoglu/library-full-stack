const knex = require("knex");
const configs = require("../knexfile");
const environment = require("../config/config").NODE_ENV;

module.exports = knex(configs[environment]);
