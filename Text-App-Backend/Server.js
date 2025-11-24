const mongoose = require("mongoose");
const express = require("express");
const {Server } = require("socket.io")
const http = require("http")


const AuthRoutes = require("./routes/AuthRoutes")
const ChatRoutes = require("./routes/ChatRoutes")
const MessageRoutes = require("./routes/MessageRoutes")
const cors = require("cors")



require("dotenv").config();

const app = express();
app.use(express.json())


app.use(cors({

  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
PORT = process.env.PORT || 5000;

const server = http.createServer(app)

const io = new Server(server , {
  cors : {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
})


io.on("connection", socket => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", data => {
    console.log("Message received:", data);

    // Broadcast to other clients
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/api", async (req, res) => {
  res.status(200).json({ message: "test api ", success: true })
})

app.use("/api/", AuthRoutes)
app.use("/api/",ChatRoutes)
app.use("/api/",MessageRoutes)

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb Connected")
}).catch((error) => {
  console.log(error)
})


server.listen(PORT, async () => {
  console.log("server is running on the ", PORT)
}) 