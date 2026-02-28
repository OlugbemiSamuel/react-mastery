import React, { useEffect, useState } from "react";
import { getItem, removeItem, saveItem } from "../utils/LocalStorage";
import type { Message } from "../types/types";
const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    return getItem("message") || [];
  });
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    saveItem("message", messages);
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1)?.sender === "user") {
      const timer = setTimeout(() => {
        const newBotMessage = {
          sender: "robot",
          message: `You sent, ${messages.at(-1)?.message}`,
          id: crypto.randomUUID(),
        };

        setMessages((prev) => [...prev, newBotMessage]);
        setIsBotTyping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  },[messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newChatMessage = {
      sender: "user",
      message: input,
      id: crypto.randomUUID(),
    };

    setMessages((prev) => [...prev, newChatMessage]);
    setInput('')
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
    setInput(e.target.value);
  };

  const handleClearChats = () => {
    setIsBotTyping(false)
    setMessages([]);
    removeItem("message");
  }

  return {
    handleKeyDown,
    handleSendMessage,
    handleInputChange,
    messages,
    isBotTyping,
    input,
    handleClearChats,
  };
};
export default useChatBot;
