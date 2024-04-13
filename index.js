const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = require("./connector");
require("./createDatabase");

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.get("/", (req, res) => {
  res.send("Welcome to JavaTpoint!");
});

app.get("/api/orders", (req, res) => {
  var { limit = 10, offset = 0 } = req.query;

  limit = parseInt(limit);
  offset = parseInt(offset);

  if (isNaN(limit) || limit < 0 || isNaN(offset) || offset < 0) {
    return res.status(400).send({ limit: 10, offset: 0 });
  }

  const sqlQuery = "SELECT * FROM orders";
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.json({
      status: res.statusCode,
      // limit: limit,
      // offset: offset,
      data: results,
    });
  });
});

module.exports = app;
