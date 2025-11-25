const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema( {
  chatId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: "Chat"
  },
  senderId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref: "User"
  },
  text : {
    type : String,
    required : true
  }
},
{timestamps : true}
)

module.exports = mongoose.model("Message", MessageSchema)
