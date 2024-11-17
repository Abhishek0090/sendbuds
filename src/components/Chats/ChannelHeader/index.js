import GroupChannelHeader from "@sendbird/uikit-react/GroupChannel/components/GroupChannelHeader";
import HeaderActionButton from "../HeaderActionButton";
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  PhoneOutgoing,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Info,
  VideoCamera,
  VideoCameraOff,
  PhoneCallEnd,
  PhoneCallStart,
} from "lucide-react";
import { useSendbird } from "@/context/SendbirdContext";
import { useEffect, useState } from "react";

const CustomChannelHeader = () => {
  const {
    initialized,
    isConnected,
    currentCall,
    currentUser,
    authenticateUser,
    makeCall,
    endCall,
    incomingCall,
    acceptIncomingCall,
    declineIncomingCall,
    channelUrl,
    calleeId,
    loggedInUser,
  } = useSendbird();

  //   const [userId, setUserId] = useState("");
  //   const [calleeId, setCalleeId] = useState("");
  //   const [callDialed, setCallDialed] = useState(false);
  const [error, setError] = useState(null);
  //   const [isMuted, setIsMuted] = useState(false);
  //   const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  //   const [callType, setCallType] = useState("");

  const handleVideoCall = async () => {
    try {
      //   setError(null);
      //   setCallDialed(true);
      await makeCall(calleeId, channelUrl);
      //   setCallType(type);
    } catch (err) {
      console.log(err, "ERROR");
      //   setError("Failed to make call. Please check connection and try again.");
      //   setCallDialed(false);
      //   setCallType("");
    }
  };

  const handleVoiceCall = () => {
    console.log("Starting voice call...");
    // Implement voice call functionality
  };

  const handleInfo = () => {
    console.log("Showing channel info...");
    //   setShowCallHistory(!showCallHistory);
  };
  return (
    <GroupChannelHeader
      renderRight={() => (
        <div className="flex items-center gap-2 px-4 mr-3">
          <HeaderActionButton icon={Phone} onClick={handleVoiceCall} />
          <HeaderActionButton icon={Video} onClick={handleVideoCall} />
          <HeaderActionButton icon={Info} onClick={handleInfo} />
        </div>
      )}
    />
  );
};

export default CustomChannelHeader;
