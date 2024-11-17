import { MicOff, VideoOff } from "lucide-react";

const StatusOverlay = ({ isMuted, isVideoEnabled }) => (
  <div className="absolute top-4 right-4 flex gap-2">
    {isMuted && (
      <div className="bg-red-500 p-2 rounded-full">
        <MicOff size={16} className="text-white" />
      </div>
    )}
    {!isVideoEnabled && (
      <div className="bg-red-500 p-2 rounded-full">
        <VideoOff size={16} className="text-white" />
      </div>
    )}
  </div>
);

export default StatusOverlay;
