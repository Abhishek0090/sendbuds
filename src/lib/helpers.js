import { Phone, Video, PhoneOff, PhoneIncoming } from "lucide-react";

export const getCallDetails = ({ message }) => {
  const eventType = message.customType;
  const isVideo = message.data?.isVideoCall;

  switch (eventType) {
    case "direct_call:dial":
      return {
        icon: isVideo ? Video : PhoneIncoming,
        text: `Incoming ${isVideo ? "Video" : "Voice"} Call`,
        className: "bg-blue-100 text-blue-600",
      };
    case "direct_call:end":
      const duration = message.data?.duration;
      const status = message.data?.endResult;
      const isMissed = status === "missed";
      const isCanceled = status === "canceled";

      return {
        icon: isMissed || isCanceled ? PhoneOff : isVideo ? Video : Phone,
        text: `${isVideo ? "Video" : "Voice"} Call ${
          isMissed ? "Missed" : isCanceled ? "Canceled" : "Ended"
        }`,
        duration: duration ? formatDuration(duration) : null,
        className: isMissed
          ? "bg-red-100 text-red-600"
          : "bg-purple-100 text-purple-600",
      };
    default:
      return null;
  }
};

export const formatDuration = (seconds) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
