import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ message = "", sendMessage, setMessage,handleKeyDown }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-xl border border-gray-300">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-3 text-sm rounded-xl border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={sendMessage}
        disabled={!message?.trim()}
        className="ml-2 p-3 rounded-full bg-blue-500 text-white disabled:bg-gray-300 hover:bg-blue-600 transition-colors duration-300"
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
