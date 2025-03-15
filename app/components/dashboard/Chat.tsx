"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; text: string; time: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 300);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);
  useEffect(() => {
    let recognition: any;

    if (listening) {
      recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();
      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
      };
      recognition.onend = () => setListening(false);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [listening]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    const newMessages = [...messages, { role: "user", text: input, time: timestamp }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("https://crop-pilot-api.azurewebsites.net/api/ChatBot/Chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure the correct response structure
      const botResponse = data.data || "Bot did not return a response.";
      console.log("Bot response:", botResponse);
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...newMessages, { role: "bot", text: "Error fetching response.", time: timestamp }]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="h-[calc(100vh-100px)]">
        <div className="w-full h-full p-4 bg-white rounded-xl shadow-2xl border border-[#D1E8D5] flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-green">🌿 Farmer&apos;s Assistant</h1>
          {/* Request & Response */}
          <div className="flex-1 overflow-y-auto border p-2  rounded-lg space-y-2 sm:space-y-3 shadow-inner">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 sm:p-3 rounded-xl max-w-[50%] break-words shadow-md ${msg.role === "user" ? "bg-green text-white" : "bg-[#000000] text-[#2E8B57]"}`}>
                  <p className="text-sm sm:text-base text-white font-[cairo]">{msg.text}</p>
                  <span className="text-xs text-[#dfdfdf] block mt-1 font-[cairo]">{msg.time}</span>
                </div>
              </div>
            ))}
            {loading && <p className="text-[#666666] pl-4 text-sm font-[cairo]">Bot is typing...</p>}
          </div>
          <div className="mt-4 sm:mt-6 flex gap-2 items-center">
            <Button onClick={() => setListening(true)} className={`p-2 sm:p-3 ${listening ? "bg-[#32CD32]" : "bg-[#228B22]"} text-white rounded-full  transition duration-300`} title="Start Listening" disabled={loading}>
              <FaMicrophone className="text-sm sm:text-base" />
            </Button>
            <Textarea
              ref={textareaRef}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-green-900 text-sm sm:text-base font-[cairo] overflow-y-auto"
              placeholder="Ask about crops, soil, or farming..."
              disabled={loading}
              rows={1}
              style={{ resize: "none" }}
            />
            <Button onClick={sendMessage} className="p-2 sm:p-3 text-white rounded-lg transition duration-300" disabled={loading} title="Send Message">
              <FaPaperPlane className="text-sm sm:text-base text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
