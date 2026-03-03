import user from "../assets/chatbot user.png";
import robot from "../assets/chatbot robot.png";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Message } from "../../types/chat";
import copyIcon from '../assets/copy-icon.svg'

export interface ChatMessagesProps {
  messages: Message[];
  isBotTyping: boolean;
}

const ChatMessages = ({ messages, isBotTyping }: ChatMessagesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  return (
    <div className="flex-1  overflow-y-auto p-4 md:p-8 space-y-8 bg-white/50 mb-32">
      <div className=" space-y-8 p-4 md:p-8">
        {messages?.map((m) => {
          const isUser = m.sender === "user";
          const avatarSrc = isUser ? user : robot;

          return (
            <div
              key={m.id}
              className={`group flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <img
                src={avatarSrc}
                className="w-8 h-8 rounded-full border border-white/20 object-cover "
                alt="chat avatar"
              />

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`max-w-[60%] md:max-w-sm px-8 m-0 py-3.75 wrap-break-word relative rounded-xl shadow-lg leading-relaxed ${
                  isUser
                    ? "bg-[#f4f4f5] text-gray-800 roundedtr-none selfend shadow-blue-500/10"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none selfstart "
                }`}
              >
                <p className="text-[15px] mb-4  leading-relaxed selection:bg-blue-300/30 ">
                  {m.text}
                </p>

              

                <span
                  className={`text-[10px] mt-5 block opacity-50 absolute bottom-2 right-3`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
               
              
      <button 
        onClick={() => navigator.clipboard.writeText(m.text)}
        className="absolute top-2 right-1 transition-opacity cursor-pointer"
        title="Copy message"
      >
        <img src={copyIcon} className="w-3 h-3 grayscale hover:bg-black/5" alt="copy" />
      </button>

    
              </motion.div>
            </div>
          );
        })}

        {isBotTyping && (
          <div className="flex gap-3 items-end">
            <img src={robot} className="w-8 h-8" alt="robot avatar" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tl-none flex gap-1"
            >
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: dot * 0.2,
                  }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        )}

        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center
                   text-center p-8 space-y-4"
          >
            <div
              className=" w-20 h-20  bg-linear-to-br from-blue-500/20 to to-purple-500/20 rounded-full flex
                          items-center justify-center border border-blue-500/30 "
            >
              <span className="text-4xl drop-shadow-lg">🤖 </span>
            </div>
            <h2 className="text-2xl font bold text-gray-800">
              How can I help you today
            </h2>
            <p className="text-xl text-gray-400 max-w-xs">
              Start a conversation with your AI assistant. I can echo your
              thoughts or just chat!
            </p>
          </motion.div>
        )}

        <div ref={scrollRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
