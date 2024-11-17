"use client";
import React from "react";
import { Phone, Video, PhoneOff } from "lucide-react";

const CallHistoryMessage = ({ call }) => {
  // Function to format timestamp to AM/PM format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to format duration from seconds
  const formatDuration = (seconds) => {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Determine call type and status
  const getCallInfo = () => {
    const isVideoCall = call.type === "video";
    const isMissed = call.status === "missed";

    return {
      icon: isVideoCall ? Video : Phone,
      text: `${isVideoCall ? "Video" : "Voice"} call`,
      variant: isMissed ? "missed" : "completed",
      duration: isMissed ? "Missed call" : formatDuration(call.duration),
    };
  };

  const callInfo = getCallInfo();
  const CallIcon = callInfo.icon;

  return (
    <div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-50">
      <div
        className={`p-2 rounded-full ${
          callInfo.variant === "missed"
            ? "bg-red-100 text-red-600"
            : "bg-purple-100 text-purple-600"
        }`}
      >
        <CallIcon size={20} />
      </div>

      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{callInfo.text}</div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span>{formatTime(call.timestamp)}</span>
          {callInfo.variant === "completed" && (
            <>
              <span>•</span>
              <span>{callInfo.duration}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallHistoryMessage;
