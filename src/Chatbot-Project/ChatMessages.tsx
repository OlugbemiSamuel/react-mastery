import user from "../assets/chatbot user.png";
import robot from "../assets/chatbot robot.png";
import type { Message } from "../types/types";

export interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages = ({ messages }:ChatMessagesProps) => {
  return (
    <div className="flex flexcol">
      <div>

     

      {messages?.map((m) => (
        <div key={m.id} className="bg-gray-200 flex-1 overflow-y-auto py-3.5 flex gap-4  px-5 max-w-75">
          {m.sender === "robot" && <img src={robot} className="w-10" alt="robotImage" />}
          {m.message}  
          {m.sender === "user" && (
            <img src={user} className="w-10" alt="chatbotUserImage" />
          )}
        </div>
        
      ))}
       </div>
    </div>
  );
};

export default ChatMessages;
