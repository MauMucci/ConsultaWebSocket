const socket = io();

socket.emit("message", 'Hola desde index.js');