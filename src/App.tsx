import "./App.css";
import ChatHeader from "./Chatbot-Project/ChatHeader";
import ChatInput from "./Chatbot-Project/ChatIpinut";
import ChatMessages from "./Chatbot-Project/ChatMessages";
// import MessageCounter from "./Chatbot-Project/MessageCounter";
import useChatBot from "./hooks/useChatBot";

function App() {
  const {
    messages,
    userInput,
    isBotTyping,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    handleClearChats,
  } = useChatBot();


  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto">
      <ChatHeader clearChats={handleClearChats} />
     
      <ChatMessages isBotTyping={isBotTyping} messages={messages} />

      <ChatInput
        disable={isBotTyping}
        input={userInput}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        sendMessage={handleSendMessage}
        clearMessage={handleClearChats}
      />

      {/* <MessageCounter count={messages.length}/> */}
    </div>
  );
}

export default App;
