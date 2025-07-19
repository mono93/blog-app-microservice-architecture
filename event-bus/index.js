const express = require("express");
const axios = require("axios");

const app = express();
// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-srv:8080/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:8081/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:8082/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:8083/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(8085, () => {
  console.log("Listening on 8085");
});
