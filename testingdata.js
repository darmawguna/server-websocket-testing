import express from "express";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    socket.send("Server received: " + msg);
  });

  socket.on("moisturelevel", (msg) => {
    console.log("moisturelevel: " + msg);
    socket.send("Server received: " + msg);
  });
});

// server.listen(3000, () => {
//   console.log("Server listening on http://localhost:3000");
// });
