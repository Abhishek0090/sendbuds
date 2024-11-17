"use client";
import CallEventMessage from "@/components/Chats/CallEventMessage";
import { useGroupChannelContext } from "@sendbird/uikit-react/GroupChannel/context";
import { useEffect } from "react";

const useCallIntegration = () => {
  const { channel, updateChannel } = useGroupChannelContext();

  useEffect(() => {
    if (channel) {
      const channelData = {
        data: {
          ...channel.data,
          enableCallEventMessages: true,
        },
      };
      updateChannel(channelData);
    }
  }, [channel]);

  const renderMessage = (message) => {
    console.log(message, "MESSAGEs");
    if (message.customType?.startsWith("direct_call:")) {
      return <CallEventMessage message={message} />;
    } else {
      //   return <div>{message}</div>;
    }
  };

  return { renderMessage };
};

export default useCallIntegration;
