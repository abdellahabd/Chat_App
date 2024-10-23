import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const port = process.env.port || 3500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

let Client_Number = new Set();

app.use(express.static(path.join(__dirname, "public")));

const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(socket.id);
  Client_Number.add(socket.id);
  io.emit("Client-total", Client_Number.size);

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnect`);
    Client_Number.delete(socket.id);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("chat_message", data);
  });
});

httpServer.listen(port);
