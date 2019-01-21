"use strict";

const Connection = require("../services/connection");

const Mongoose = require("mongoose");
const database = require("../services/database").db;
const Content = database.model("Content");
const User = database.model("User");

const md5 = require("crypto-js/md5");

const Utils = require("../services/utils");

Connection.on("content.getRelated", async function(userSocket, params, cb) {
  let contents = await Content.getRelated(userSocket.user_id, params.filter);
  cb({ success: contents });
});

Connection.on("content.getChildren", async function(userSocket, params, cb) {
  let contents = await Content.getChildren(params.id, params.filter);
  cb({ success: contents });
});

Connection.on("content.create", async function(userSocket, params, cb) {
  const user = await User.getById(userSocket.user_id);
  let parent;
  if (!!params.content.parent)
    parent = await Content.getById(params.content.parent);
  if (!!parent && !parent.creator.equals(user._id) && !user.is_admin)
    return cb({
      error: "You cannot to do something under this parent Content"
    });
  params.content.creator = user;
  if (params.content.responsible)
    params.content.responsible = Mongoose.Types.ObjectId(
      params.content.responsible.toString()
    );
  if (params.content.observer)
    params.content.observer = params.content.observer.map(
      Mongoose.Types.ObjectId
    );
  if (params.content.performer)
    params.content.performer = params.content.performer.map(
      Mongoose.Types.ObjectId
    );
  let content = new Content(params.content);
  await content.save();

  cb({ success: content._id });

  if (params.notify && parent !== undefined && parent.follower != undefined) {
    for (let follower of parent.follower) {
      User.notify(follower, {
        type: "content.create",
        contentType: params.content.type,
        contentId: content._id
      });
    }
  }
});

Connection.on("content.read", async function(userSocket, params, cb) {
  const user = await User.getById(userSocket.user_id);
  let content = await Content.getById(params.id, params.populate);
  if (!content || (!content.creator.equals(user._id) && !user.is_admin))
    return cb({ error: "You cannot read this Content" });

  cb({ success: content });
});

Connection.on("content.update", async function(userSocket, params, cb) {
  const user = await User.getById(userSocket.user_id);
  let content = await Content.getById(params.id);
  if (!content || (!content.creator.equals(user._id) && !user.is_admin))
    return cb({ error: "You cannot edit this Content" });
  if (params.content.responsible)
    params.content.responsible = Mongoose.Types.ObjectId(
      params.content.responsible.toString()
    );
  if (params.content.observer)
    params.content.observer = params.content.observer.map(
      Mongoose.Types.ObjectId
    );
  if (params.content.performer)
    params.content.performer = params.content.performer.map(
      Mongoose.Types.ObjectId
    );
  Object.assign(content, params.content);
  await content.save();

  cb({ success: content._id });

  if (params.notify && content.follower != undefined) {
    for (let follower of content.follower) {
      User.notify(follower, {
        type: "content.update",
        contentType: params.content.type,
        contentId: content._id
      });
    }
  }
});

Connection.on("content.delete", async function(userSocket, params, cb) {
  const user = await User.getById(userSocket.user_id);
  let content = await Content.getById(params.id);
  if (!content || (!content.creator.equals(user._id) && !user.is_admin))
    return cb({ error: "You cannot delete this Content" });

  await content.delete();

  cb({ success: true });

  if (params.notify && content.follower != undefined) {
    for (let follower of content.follower) {
      User.notify(follower, {
        type: "content.delete",
        contentType: params.content.type,
        contentId: content._id
      });
    }
  }
});
