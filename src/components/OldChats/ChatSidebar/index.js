"use client";
import React, { useState } from "react";

const ChatSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-[25%] overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 ">
          <button className="btn btn-1 px-2 py-2 !text-black font-bold">
            Create Chat
          </button>
          <button className="btn btn-3 px-2 py-2 !text-black font-bold">
            Schedule Call
          </button>
        </div>
        {[...Array(5)].map((_, idx) => {
          return (
            <div
              key={idx}
              className="flex gap-3 items-center py-2 px-2  btn btn-2 rounded-2xl w-[300px]"
            >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4537/4537069.png"
                  alt="img"
                  className="w-12 h-12 rounded-full"
                />
              </span>

              <span className="text-black font-bold">{"Abhishek"}</span>
            </div>
          );
        })}
      </div>
      {/* {showModal && <} */}
    </div>
  );
};

export default ChatSidebar;
