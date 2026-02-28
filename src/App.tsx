import "./App.css";
import ChatInput from "./Chatbot-Project/ChatIpinut";
import ChatMessages from "./Chatbot-Project/ChatMessages";
import MessageCounter from "./Chatbot-Project/MessageCounter";
import useChatBot from "./hooks/useChatBot";

function App() {
  const {
    messages,
    input,
    isBotTyping,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    handleClearChats,
  } = useChatBot();


  return (
    <div className="min-h-screen flex flex-col">
      <ChatInput
        disable={isBotTyping}
        input={input}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        sendMessage={handleSendMessage}
        clearMessage={handleClearChats}
      />

      <ChatMessages messages={messages} />
      {/* <MessageCounter count={messages.length}/> */}
    </div>
  );
}

export default App;
