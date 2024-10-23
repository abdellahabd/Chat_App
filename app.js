import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const port = process.env.port || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log(socket.id.substring(0, 5));
});

httpServer.listen(port);
