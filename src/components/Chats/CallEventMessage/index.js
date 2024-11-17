import React from "react";
import { getCallDetails } from "@/lib/helpers";

const CallEventMessage = ({ message }) => {
  // Helper function to get call status details

  const details = getCallDetails();
  if (!details) return null;

  const CallIcon = details.icon;

  return (
    <div className="flex items-center gap-2 p-3 my-2 rounded-lg bg-gray-50">
      <div className={`p-2 rounded-full ${details.className}`}>
        <CallIcon size={20} />
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-900">
          {details.text}
        </span>
        {details.duration && (
          <span className="text-xs text-gray-500 ml-2">
            ({details.duration})
          </span>
        )}
      </div>
      <div className="text-xs text-gray-500">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default CallEventMessage;
