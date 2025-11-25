const express = require("express");
const Chat = require("../models/ChatSchema");

const router = express.Router();


router.post("/chat/create", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

     if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "senderId and receiverId are required"
      });
    }
    const chat = await Chat.create( {
      members : [senderId, receiverId]
    })
    res.status(200).json({message : "chat has been created" , success : true , data : chat})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false})
  }
})

router.get("/chat/:userId", async (req,res) => {
  
  try {
    const chats = await Chat.find({
      members : { $in : [req.params.userId]}
    })
    .populate("members","username email ")
    res.status(200).json({message : "All chats ", success : true,data : chats})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false,error : error.message})
  }
})

module.exports = router 