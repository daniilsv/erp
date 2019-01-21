"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { first: String, second: { type: String, default: "" } },
    email: String,
    is_admin: { type: Boolean, default: false },
    password: String,
    pass_salt: String,
    auth: [
      {
        token: String,
        time: { type: Date, default: Date.now }
      }
    ]
  },
  {
    toObject: {
      transform: function(doc, ret, options) {
        if (!options["with_auth"]) delete ret.auth;
        if (!options["with_pass"]) {
          delete ret.password;
          delete ret.pass_salt;
        }
        delete ret.__v;
        return ret;
      }
    }
  }
);

UserSchema.methods = {};

UserSchema.statics = {
  getByToken: function(token) {
    return this.findOne({ "auth.token": token }).exec();
  },

  getById: function(id) {
    if (!(id instanceof Mongoose.Schema.ObjectId))
      id = Mongoose.Types.ObjectId(id.toString());
    return this.findOne({ _id: id }).exec();
  },

  getByName: function(name) {
    return this.find({
      $or: [
        { "name.first": new RegExp(name, "i") },
        { "name.second": new RegExp(name, "i") }
      ]
    })
      .limit(10)
      .exec();
  },

  getByEmail: function(email) {
    return this.findOne({ email: email }).exec();
  },

  notify: function(user_id, params) {
    if (!(user_id instanceof Mongoose.Schema.ObjectId))
      id = Mongoose.Types.ObjectId(user_id.toString());
    console.log("STUB", "User.notify", user_id, params);
  }
};

Mongoose.model("User", UserSchema);
