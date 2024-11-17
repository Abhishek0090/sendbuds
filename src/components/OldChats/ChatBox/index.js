"use client";
import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

const Chatbox = ({ messages = [], scrollRef }) => {
  if (!Array.isArray(messages)) {
    console.error("Messages prop should be an array");
    return null;
  }

  return (
    <div className="flex-1 h-[500px] overflow-y-auto text-black">
      <div className="flex flex-col gap-4 justify-end items-start px-4 py-2">
        {messages.map((msg, idx) => (
          <div
            key={msg.messageId}
            className={`flex gap-4 items-center w-full max-w-[350px]  py-2 px-4 rounded-lg 
                        ${
                          msg.isCurrentUser
                            ? "btn btn-2 self-end"
                            : "btn btn-3 self-start"
                        }`}
            ref={scrollRef}
          >
            <span>
              <img
                src={
                  msg.senderAvatar ||
                  "https://cdn-icons-png.flaticon.com/512/4537/4537069.png"
                }
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
            </span>

            <div className="flex flex-col items-start gap-2 text-black">
              <div className="text-sm font-semibold">{msg.senderName}</div>
              <div>{msg.message}</div>
            </div>

            {msg.isCurrentUser && (
              <span className="pt-1">
                <FaCheck className="text-green-500" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default Chatbox;
