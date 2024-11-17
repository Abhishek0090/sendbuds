import React from "react";
import { FaInfo, FaPhone, FaVideo } from "react-icons/fa";
import VideoCall from "../VideoCall";
import Call from "../Call";

const ChatHeader = () => {
  return (
    <div className="flex gap-3 justify-between p-3 rounded-2xl btn btn-2 !text-black">
      <div className="flex gap-2 items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4537/4537069.png"
          alt="img"
          className="w-12 h-12 rounded-full"
        />{" "}
        <span className="font-bold">Abhishek</span>
      </div>
      <div className="flex gap-3 items-center">
        <VideoCall />
        <Call />
        <button className="bg-gray-200 p-2 rounded-full">
          <FaInfo />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
