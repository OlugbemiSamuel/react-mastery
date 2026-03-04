import React, { useEffect, useState } from "react";
import { getItem, removeItem, saveItem } from "../../utils/LocalStorage";
import type { Message } from "../../types/chat";


// import axios from "axios";


const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    return getItem("message") || [];
  });
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    saveItem("message", messages);
  }, [messages]);

const getBotResponse = async (userInput: string): Promise<string> => {
 
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`,

      },
      body: JSON.stringify({
      model: "llama-3.1-8b-instant",
        max_tokens: 300,
        messages: [{ role: "user", content: userInput }],
      }),
    });
    const data = await response.json();
    if(data.error){
      console.log(`API ERROR: `, data.error.message)
      return 'sorry somehting went wrong'
    }
    console.log("Full response from Anthropic:", data); // ADD THIS
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return "Sorry, I couldn't connect right now. Try again!";
  }
};

  useEffect(() => {
    if (messages.length > 0 && messages.at(-1)?.sender === "user") {
      const timer = setTimeout( async() => {
        const botText = await getBotResponse(messages.at(-1)?.text || '')
        const newBotMessage: Message = {
          sender: "robot",
          text: botText,
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
    if(e.target.value.length > 5000) return
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
