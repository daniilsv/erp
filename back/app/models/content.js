"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ContentSchema = new Schema(
  {
    parent: { type: Schema.Types.ObjectId, rel: "Content" },
    type: String,
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, rel: "User" },
    responsible: { type: Schema.Types.ObjectId, rel: "User" },
    performer: [{ type: Schema.Types.ObjectId, rel: "User" }],
    observer: [{ type: Schema.Types.ObjectId, rel: "User" }],
    timeStart: Date,
    timeEnd: Date,
    tag: [String],
    fields: [Schema.Types.Mixed]
  },
  {
    toObject: {
      transform: function(doc, ret, options) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

ContentSchema.methods = {};

ContentSchema.statics = {
  delete: function(content_id) {
    if (!(content_id instanceof Mongoose.Schema.ObjectId))
      content_id = Mongoose.Types.ObjectId(content_id.toString());
    return this.remove({ _id: content_id }).exec();
  },

  getById: function(id, populate) {
    if (!(id instanceof Mongoose.Schema.ObjectId))
      id = Mongoose.Types.ObjectId(id.toString());
    let query = this.findOne({ _id: id });
    if (populate) query.populate("parent");
    return query.exec();
  },

  getChildren: function(id) {
    if (!(id instanceof Mongoose.Schema.ObjectId))
      id = Mongoose.Types.ObjectId(id.toString());
    return this.find({ parent: id }).exec();
  },

  getRelated: function(user_id, filter) {
    if (!(user_id instanceof Mongoose.Schema.ObjectId))
      user_id = Mongoose.Types.ObjectId(user_id.toString());
    let params = { creator: user_id };
    if (filter !== undefined) {
      params = { $and: [params, filter] };
    }
    return this.find(params).exec();
  }
};

Mongoose.model("Content", ContentSchema);
