const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

    app.use(express.static("client"));

let players = {};

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    players[socket.id] = {
        x: 100,
        y: 100
    };

    socket.emit("init", socket.id);

    socket.on("move", (data) => {
        let player = players[socket.id];
        if (!player) return;

        // 🛡️ SERVER VALIDATION (anti-cheat)
        const speed = 5;
        if (Math.abs(data.dx) > speed || Math.abs(data.dy) > speed) return;

        player.x += data.dx;
        player.y += data.dy;
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

setInterval(() => {
    io.sockets.emit("state", players);
}, 1000 / 30);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});