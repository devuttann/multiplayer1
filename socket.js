let socket = io();
let myId;
window.players = {};

socket.on("init", (id) => {
    myId = id;
});

socket.on("state", (serverPlayers) => {
    players = serverPlayers;
});
