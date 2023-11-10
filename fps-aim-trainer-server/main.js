import express from "express";

import cors from "cors";

import { db } from "./dbConfig";

import fs from "fs";

import https from "https";
import http from "http";

import { generateSSLCertificate } from "./https_certificate";
import { exec } from "child_process";

const app = express();

app.use(express.json());

express.urlencoded({
  extended: true,
});

app.use(cors());

app.post("/set-score", (req, res) => {
  const { username, score } = req.body;

  db.query(
    `insert into score(username, score) values($1, $2) returning *`,
    [username, score],
    (err, response) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(response.rows[0]);
        return res.json(response.rows[0]);
      }
    }
  );
});

app.get("/get-high-score", (req, res) => {
  db.query(
    "SELECT * FROM score ORDER BY score DESC LIMIT 1",
    (err, response) => {
      if (err) {
        res.json(err);
      } else {
        res.json(response.rows);
      }
    }
  );
});

app.get("/get-all-scores", (req, res) => {
  db.query("select * from score", (err, response) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      console.log(response.rows);
      return res.json(response.rows);
    }
  });
});

app.get("/", (req, res) => {
  db.query("select * from score", (err, response) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      console.log(response.rows);
      return res.json(response.rows);
    }
  });
});

const runServer = () => {
  if (process.env.NODE_ENV === "development") {
    http.createServer(
      app.listen(process.env.PORT ?? 3000, () => {
        console.log("Express server listening on port 3000 with HTTP");
      })
    );
  } else {
    generateSSLCertificate();

    setTimeout(() => {
      const options = {
        cert: fs.readFileSync("localhost.cert"),
        key: fs.readFileSync("localhost.key"),
      };

      https.createServer(options, app).listen(3000, function () {
        console.log("Express server listening on port 3000 with HTTPS");
      });
    }, 1000);
  }
};

runServer();

function gracefulShutdown() {
  console.log("\nClosing server...");
  exec(`rm -rf localhost.cert && rm localhost.key`, (err, stdOut) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("stdOut", stdOut);
    }
  });
  console.log("Server closed");
  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
