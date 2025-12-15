const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  transports: ["polling"]
});

app.use(express.static("public"));

// Store messages in memory
const messages = [];

io.on("connection", socket => {
  console.log("User connected");

  // Send chat history to new user
  socket.emit("chat-history", messages);

  socket.on("chat-message", msg => {
    const message = {
      text: msg,
      time: Date.now()
    };

    messages.push(message);

    // keep last 100 messages max
    if (messages.length > 100) messages.shift();

    io.emit("chat-message", message);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
