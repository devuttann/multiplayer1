let socket = io();
let myId;
let players = {};

socket.on("init", (id) => {
    myId = id;
});

socket.on("state", (serverPlayers) => {
    players = serverPlayers;
});