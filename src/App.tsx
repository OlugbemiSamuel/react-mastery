import "./App.css";
import Column from "./components/kanban/Column";
// import ChatHeader from "./components/Chatbot-Project/ChatHeader";
// import ChatInput from "./components/Chatbot-Project/ChatIpinut";
// import ChatMessages from "./components/Chatbot-Project/ChatMessages";
// // import MessageCounter from "./Chatbot-Project/MessageCounter";
// import useChatBot from "./components/hooks/useChatBot";

function App() {
  // const {
  //   messages,
  //   userInput,
  //   isBotTyping,
  //   handleSendMessage,
  //   handleInputChange,
  //   handleKeyDown,
  //   handleClearChats,
  // } = useChatBot();


  return (
    // <div className="min-h-screen flex flex-col max-w-3xl mx-auto">
    
    <div className="min-h-screen flex flex-col md:flex-row max-w-6xl gap-6 items-start mx-auto">
      

      <Column title="To do" status="TODO"/>
      <Column title="In Progress" status="IN_PROGRESS"/>
      <Column title="Done" status="DONE" />

      
    </div>
  );
  {/* <ChatHeader clearChats={handleClearChats} />
     
      <ChatMessages isBotTyping={isBotTyping} messages={messages} />

      <ChatInput
        disable={isBotTyping}
        input={userInput}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        sendMessage={handleSendMessage}
        clearMessage={handleClearChats}
      /> */}
      {/* <MessageCounter count={messages.length}/> */}
}

export default App;
