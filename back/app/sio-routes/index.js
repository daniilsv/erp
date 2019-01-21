"use strict";

const Connection = require("../services/connection");

const database = require("../services/database").db;
const User = database.model("User");

Connection.on(
  "token",
  async function(socket_id, params, cb) {
    console.log(socket_id, params);
    cb("Hah!");
  },
  true
);
