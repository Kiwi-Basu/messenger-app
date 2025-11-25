import ChatList from "../components/Chat/ChatList";

function Home() {
  return (
    <div className="flex">
      <div className = "border">
      <ChatList />
      </div>
      {/* Later you will add chat window on the right */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">Select a chat</h1>
      </div>
    </div>
  );
}

export default Home;
