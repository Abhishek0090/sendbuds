"use client";
import React, { useEffect, useState } from "react";
import {
  GroupChannelProvider,
  useGroupChannel,
} from "@sendbird/uikit-react/GroupChannel/context";
import CallHistoryMessage from "./Message";

const CallHistoryIntegration = () => {
  //   const [callHistory, setCallHistory] = useState([]);
  const { channel, messages } = useGroupChannel();

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        // Assuming you store call records as custom messages or in channel metadata
        const customType = "call_record";
        const messageListParams = {
          customTypes: [customType],
          prevResultSize: 100,
        };

        const messageList = await channel.getMessages(messageListParams);
        const calls = messageList.map((message) => ({
          id: message.messageId,
          type: message.data?.callType || "voice",
          status: message.data?.status || "completed",
          duration: message.data?.duration,
          timestamp: message.createdAt,
        }));


        // setCallHistory(calls);
      } catch (error) {
        console.error("Error fetching call history:", error);
      }
    };

    if (channel) {
      fetchCallHistory();
    }
  }, [channel]);

  // Custom message renderer that adds call history items
  const renderMessage = (message, index) => {
    // If the message is a call record, render our custom component
    if (message.customType === "call_record") {
      return (
        <CallHistoryMessage
          key={message.messageId}
          call={{
            type: message.data?.callType,
            status: message.data?.status,
            duration: message.data?.duration,
            timestamp: message.createdAt,
          }}
        />
      );
    }

    // Otherwise, return null to let Sendbird handle regular messages
    return null;
  };

  return {
    renderMessage,
  };
};

export const WrapperCallIntegration = () => {
  return (
    <GroupChannelProvider>
      <CallHistoryIntegration />
    </GroupChannelProvider>
  );
};

export default WrapperCallIntegration;
