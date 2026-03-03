import React, { useEffect, useState } from "react";
import { getItem, removeItem, saveItem } from "../utils/LocalStorage";
import type { Message } from "../types/chat";

const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    return getItem("message") || [];
  });
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    saveItem("message", messages);
  }, [messages]);

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes("hello") || input.includes("hi"))
      return "Hello! How can I help you build today?";
    if (input.includes("project"))
      return "Projects are the best way to learn. Are we working on the Chatbot?";
    if (input.includes("time"))
      return `The current time is ${new Date().toLocaleTimeString()}`;
    return "I'm sorry, I'm still learning. I can greet you, tell the time, or talk about chatbot projects!";
  };

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1)?.sender === "user") {
      const timer = setTimeout(() => {
        const newBotMessage: Message = {
          sender: "robot",
          text: getBotResponse(messages.at(-1)?.text || ""),
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, newBotMessage]);
        setIsBotTyping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newChatMessage: Message = {
      sender: "user",
      text: userInput,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newChatMessage]);
    setUserInput("");
    setIsBotTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isBotTyping) {
        handleSendMessage();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClearChats = () => {
    setIsBotTyping(false);
    setMessages([]);
    removeItem("message");
  };

  return {
    handleKeyDown,
    handleSendMessage,
    handleInputChange,
    messages,
    isBotTyping,
    userInput,
    handleClearChats,
  };
};
export default useChatBot;
