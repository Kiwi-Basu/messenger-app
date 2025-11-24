const express = require("express");
const Chat = require("../models/ChatSchema");

const router = express.Router();


router.post("/create", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const chat = await Chat.create( {
      members : [senderId, receiverId]
    })
    res.status(200).json({message : "chat has been created" , success : true , data : chat})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false})
  }
})

router.get("/:userId", async (req,res) => {
  
  try {
    const chats = await Chat.find({
      members : { $in : [req.params.userId]}
    })
    res.status(200).json({message : "All chats ", success : true})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false})
  }
})

module.exports = router 