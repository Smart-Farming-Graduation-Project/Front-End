import ChatBot from "@/app/components/dashboard/Chat";
import React from "react";

const Chat = () => {
  return (
    <div className="flex-1 p-2 md:p-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <span className="block h-1 w-10 bg-green rounded-lg"></span>

      <div className="mt-4">
        <ChatBot />
      </div>
    </div>
  );
};

export default Chat;
