import API from "../../utils/API"
import { useEffect, useState } from "react"

interface ChatWindowProps {
  chat: any;
  userId: any;
}

function ChatWindow({ chat, userId }: ChatWindowProps) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")

  const getMessags = async() => {
    const res = await API.get(`/msg/${chat._id}`)
    setMessages(res.data.data)
  }

  const sendMsg = async() => {
      API.post('/msg/send',{
      chatId: chat._id,
      senderId: userId,
      text
    })
    setText("")
    getMessags()
  }

  getMessags()

  return (
    <div>
      <h1>Chat Window</h1>
      <div>
        {messages.map((message : any) => {
          return (
            <div key={message._id}> 
              <p>
                {message.senderId === userId ? "You" : "Other"} : {message.text}
              </p>
            </div>
          )
        }) }
      </div>

      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow