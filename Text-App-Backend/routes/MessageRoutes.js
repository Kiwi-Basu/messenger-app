const express = require("express");
const Message = require("../models/MessageSchema")

const router = express.Router()

router.post("/send", async(req, res ) => {
  try {
    const {chatId, senderId, text} = req.body
    const msg = await Message.create({
      chatId,
      senderId,
      text      
    })
    res.status(200).json({message : "message has been sent" , success : true , data : msg})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false , error :error.message})
  }
})


router.get("/chat/:chatId", async(req,res) => {
  try {
    const messages = await Message.find( {
      chatId : req.params.chatId
    }).sort({createdAt : 1})

    res.status(200).json({message : "All messages", success : true , data : messages})
  } catch (error) {
    res.status(500).json({message : "server is having issues" , success : false , error :error.message})
  }
})

module.exports = router