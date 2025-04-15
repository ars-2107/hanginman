import { useEffect, useState } from "react";

interface ChatBubbleProps {
  isVisible: boolean;
  message: string;
  position?: "left" | "right";
}

const ChatBubble = ({ isVisible, message, position = "right" }: ChatBubbleProps) => {
  if (!isVisible) return null;

  return (
    <div className={`absolute ${position === "right" ? "right-0 -mr-20" : "left-0 -ml-20"} top-0 z-10 transition-opacity duration-300`}>
      <div className="relative bg-white dark:bg-black rounded-lg p-3 shadow-md border border-gray-200 text-sm w-32 min-h-12 flex items-center justify-center">
        <div className={`absolute top-1/2 ${position === "right" ? "right-full" : "left-full"} -translate-y-1/2`}>
          <div className={`border-solid border-transparent ${position === "right" ? "border-r-gray-200 border-l-0" : "border-l-gray-200 border-r-0"} border-y-transparent border-8`}></div>
        </div>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;