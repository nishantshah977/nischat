const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const nlp = require("./nlp.js");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });



io.on("connection", (socket) => {
  socket.on("message",async (message)=>{
    let ans = await nlp(message);
    io.to(socket.id).emit("response",ans);
})
});


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

httpServer.listen(3000);
