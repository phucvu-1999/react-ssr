import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import express from "express";
import fs from "fs";
import path from "path";

const PORT = 8000;

const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("../build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log("Something went wrong !", err);
      return res.status(500).send("Some error happend");
    }

    return res.send(
      data.replace(
        "<div id='root'></div>",
        `<div id='root>${ReactDOMServer.renderToString(App())}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}`);
});
