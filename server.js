const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
app.use(cors());
const userRoutes = require('./Routes/RoutesUsers');
app.use(express.json());
app.use('/api', userRoutes);
const io = socketIo(server, {
  cors: { origin: "*" }
});

app.get("/", (req, res) => {
  res.send("Serveur Node.js fonctionne !");
});

io.on("connection", (socket) => {
  console.log("✅ Client connecté :", socket.id);

  socket.on("busLocationUpdate", (data) => {
    console.log("📩 Message reçu :", data);
    io.emit("busLocationUpdate", data);
  });
  socket.on("busId", (data) => {
    console.log("🔑 busId :", data);
    io.emit("busId", data);
  });
  socket.on("busLocationStart", (data) => {
    console.log("🚌 busLocationStart :", data);
    io.emit("busLocationStart", data);
  });
 
  socket.on("disconnect", () => {
    console.log("❌ Client déconnecté :", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Serveur en écoute sur http://localhost:3000");
});

//const API_URL = "http://localhost:3000/api/users";
const API_URL = "https://serveurnode.onrender.com/api/users";

fetch(API_URL)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
