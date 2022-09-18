const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const socketIo = require("socket.io");
const app = require("express")();
const server = require("http").Server(app);
const io = socketIo(server);

app.use(express.urlencoded())
app.use(express.json())

io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);
  socket.emit("connected");
});

nextApp.prepare().then(() => {
  app.post("/webhook", (req, res) => {
    data = req.body;
    let request_id = data.request_id
    io.emit(request_id, data);
    console.log(data);

    res.end();
  });

  app.use("/", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
