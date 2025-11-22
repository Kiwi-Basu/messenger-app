const mongoose = require("mongoose");
const express = require("express");
const AuthRoutes = require("./routes/AuthRoutes")

require("dotenv").config();

const app = express();
app.use(express.json())

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