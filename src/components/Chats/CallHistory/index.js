import { Video } from "lucide-react";

const CallHistory = () => (
  <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
    <h3 className="font-medium mb-3">Recent Calls</h3>
    <div className="space-y-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
          <Video size={16} className="mr-2" />
          <span>Video call</span>
        </div>
        <span className="text-sm text-gray-500">30:48</span>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
          <Video size={16} className="mr-2" />
          <span>Missed call</span>
        </div>
        <span className="text-sm text-red-500">Missed</span>
      </div>
    </div>
  </div>
);

export default CallHistory;
