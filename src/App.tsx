import { useEffect, useState } from "react";
import "./App.css";
import ChatInput from "./Chatbot-Project/ChatIpinut";
import ChatMessages from "./Chatbot-Project/ChatMessages";
import type { Message } from "./types/types";



function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState<boolean>(false);


  useEffect(() => {
    if(messages.length > 0 && messages.at(-1)?.sender === 'user'){
   
    const timer = setTimeout(() => {

       
      const newBotMessages = {
        sender: 'robot',
        message: `You said: ${messages.at(-1)?.message}. Thats cool`,
        id: crypto.randomUUID(),
      }
      setMessages(prev => [...prev, newBotMessages]);
      console.log(newBotMessages.sender);
      setIsTyping(false);
    

    },2000);
      
    

    // to prevent memory leak and stop effect on unmounted components.
    return () => clearTimeout(timer);
    

    }
    

  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return;
      setIsTyping(true)

    const newChatmessage =  {
        sender: 'user',
        message: input,
        id: crypto.randomUUID(),
    }

     setMessages(prev => [...prev, newChatmessage] )
    
    setInput("");
      
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if(!isTyping){
         handleSendMessage();

      }
     
      
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <>
      <ChatInput
      disable = {isTyping}
        input={input}
        onKeyDown={handleKeydown}
        onChange={handleInputChange}
        sendMessage={handleSendMessage}
      />

      <ChatMessages messages={messages} />
    </>
  );
}

export default App;
