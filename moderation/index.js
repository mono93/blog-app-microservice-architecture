const express = require("express");
const axios = require("axios");

const app = express();
// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    // Simulate a delay for moderation
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    await axios.post("http://localhost:8085/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(8083, () => {
  console.log("Listening on 8083");
});
