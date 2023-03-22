"use strict";
/** Database setup for jobly. */
const { Client, Pool } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Pool({
    connectionString: getDatabaseUri(),
    idle_in_transaction_session_timeout:30000,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Pool({
    connectionString: getDatabaseUri(),
    idle_in_transaction_session_timeout:30000,
  });
}

db.connect();

module.exports = db;