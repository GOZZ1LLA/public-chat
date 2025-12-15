const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ["polling"] // 👈 IMPORTANT
});

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("User connected");

  socket.on("chat-message", msg => {
    console.log("Message received:", msg);
    io.emit("chat-message", msg);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
