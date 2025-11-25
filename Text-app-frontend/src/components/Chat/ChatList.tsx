import { useEffect, useState } from "react"
import API from "../../utils/API"
import TokenDecoder from "../../utils/TokenDecoder"
import ChatWindow from "./ChatWindow"

function ChatList() {

  const [selectedChat,setSelectedChat] = useState()
  const [chats, setChats] = useState([])

  const userId = TokenDecoder()?.id;


  const getAllChats = async () => {
    const res = await API.get(`/chat/${userId}`)
    const chatlist = res.data.data
    
    const lastChat : any = await Promise.all(
      chatlist.map(async (chat : any ) => {
        const last = await API.get("/msg/last/" + chat._id)
        return {
          ...chat,
          lastMessage: last.data.data
        }
      })
    )
    setChats(lastChat)
  }

  

  useEffect(() => {
    getAllChats()
  }, [])

  return (
    <>
      <div>
        <p>chat list</p>
        {chats.map((chat: any, id: number) => {
          const member = chat.members.find((mem : any) => mem._id !== userId)

          return (
            <div key={id} onClick={() => setSelectedChat(chat)}>
              <p>chat id : {member.username}</p>
              <p>{chat.lastMessage?.text || "No messages yet"}</p>
            </div>
          )
        })}
      </div>
      <div>
        <ChatWindow chat={selectedChat} userId={userId}/>
      </div>
    </>
  )
}
export default ChatList