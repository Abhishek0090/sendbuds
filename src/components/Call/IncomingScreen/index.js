import { Phone, PhoneOff } from "lucide-react";
import React from "react";

const IncomingCall = ({
  incomingCall,
  acceptIncomingCall,
  declineIncomingCall,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Incoming Call</h2>
        <p>Incoming call from {incomingCall.caller.userId}</p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={acceptIncomingCall}
            className="mr-4 flex gap-2 rounded-full px-4 py-2 text-white bg-green-500 hover:bg-green-600"
          >
            <Phone />
            Accept
          </button>
          <button
            onClick={declineIncomingCall}
            className="px-4 py-2 flex gap-2 rounded-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            <PhoneOff />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
