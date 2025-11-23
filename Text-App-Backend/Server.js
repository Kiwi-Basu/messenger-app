const mongoose = require("mongoose");
const express = require("express");
const AuthRoutes = require("./routes/AuthRoutes")
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

app.get("/api", async (req, res) => {
  res.status(200).json({ message: "test api ", success: true })
})

app.use("/api/auth", AuthRoutes)


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb Connected")
}).catch((error) => {
  console.log(error)
})


app.listen(PORT, async () => {
  console.log("server is running on the ", PORT)
})