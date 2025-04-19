import ChatBot from "@/app/components/dashboard/Chat";
import React from "react";

const Chat = () => {
  return (
    <div className="flex-1">
      <div className="p-2 mt-12 md:mt-0">
        <h1 className="text-2xl font-bold ">Chat</h1>
        <span className="block h-1 w-14 bg-green rounded-lg"></span>
      </div>
      <div className="mt-4">
        <ChatBot />
      </div>
    </div>
  );
};

export default Chat;
