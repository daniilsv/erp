"use strict";

const Connection = require("../services/connection");

const database = require("../services/database").db;
const User = database.model("User");

const md5 = require("crypto-js/md5");

const Utils = require("../services/utils");

Connection.on("user.autocomplete", async function(userSocket, params, cb) {
  let contents = await User.getByName(params.name);
  contents = contents.map(user => ({
    value: user._id,
    text: (user.name.first + " " + (user.name.second || "")).trim()
  }));
  cb(contents);
});
