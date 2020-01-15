const pg = require('pg');
require('dotenv').config();

exports.pool = pg.Pool({
  host: process.env.ENV_HOST,
  databese: process.env.ENV_DB,
  user: process.env.ENV_USER,
  port: 5432,
  password: process.env.ENV_PASSWORD,
});
