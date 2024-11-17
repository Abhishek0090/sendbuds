import { User } from "lucide-react";

const VideoPlaceholder = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400">
    <User size={64} className="mb-4" />
    <span className="text-lg font-medium">Video Disabled</span>
  </div>
);

export default VideoPlaceholder;
