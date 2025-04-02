const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Connecté au serveur !");
  socket.emit("message", "Hello serveur !");
});

socket.on("message", (data) => {
  console.log("📩 Message reçu du serveur :", data);
});
