"use strict";

const url = require("url");
const fs = require("fs");
const path = require("path");

const mimeType = {
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".eot": "appliaction/vnd.ms-fontobject",
  ".ttf": "aplication/font-sfnt"
};

module.exports = function(req, res) {
  console.log(`${req.method} ${req.url}`);
  const parsedUrl = url.parse(req.url);
  const sanitizePath =
    "../../public/" +
    path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, "");
  let pathname = path.join(__dirname, sanitizePath);
  fs.exists(pathname, function(exist) {
    if (!exist) {
      pathname = "/";
    }
    if (fs.statSync(pathname).isDirectory()) {
      pathname += "/index.html";
    }
    fs.readFile(pathname, function(err, data) {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        const ext = path.parse(pathname).ext;
        res.setHeader("Content-type", mimeType[ext] || "text/plain");
        res.end(data);
      }
    });
  });
};
