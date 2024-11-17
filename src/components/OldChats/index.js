"use client";

import React, { useState, useEffect, useRef } from "react";
import { sb } from "@/utils/sendbird";
import ChatHeader from "./ChatHeader";
import Chatbox from "./ChatBox";
import ChatSidebar from "./ChatSidebar";
import ChatInput from "./ChatInput";

const Chat = ({ channelUrl, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Assuming the user is already connected
        await sb.connect(currentUser.id);

        // Retrieve the channel using the `channelUrl`
        const channel = await sb.GroupChannel.getChannel(channelUrl);
        setChannel(channel);

        // Listening for new messages
        channel.onMessageReceived = (msg) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              messageId: msg.messageId,
              senderName: msg.sender.nickname,
              senderAvatar: msg.sender.profileUrl,
              message: msg.message,
              isCurrentUser: msg.sender.userId === currentUser.id,
            },
          ]);
        };
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [currentUser, channelUrl]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      messageId: messages.length + 1,
      senderName: currentUser.nickname,
      senderAvatar: currentUser.avatar,
      message,
      isCurrentUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    if (channel) {
      channel.sendUserMessage(message, (sentMessage, error) => {
        if (error) {
          console.error("Error sending message:", error);
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full p-10">
      <div className="flex gap-5 btn btn-4 p-6 h-[90vh]">
        <ChatSidebar />
        <div className="flex flex-col gap-4 w-[75%]">
          <ChatHeader />
          <Chatbox messages={messages} scrollRef={scrollRef} />
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
