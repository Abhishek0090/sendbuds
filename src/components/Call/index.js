// app/components/CallInterface.tsx
"use client";

import { useEffect, useState } from "react";
import { useSendbird } from "../../context/SendbirdContext";
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
} from "lucide-react";
import IncomingCall from "./IncomingScreen";
import VideoScreen from "./VideoScreen";
import TeamsVideoCall from "./VideoScreen";

export default function CallInterface() {
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
  } = useSendbird();

  const [userId, setUserId] = useState("");
  const [calleeId, setCalleeId] = useState("");
  const [callDialed, setCallDialed] = useState(false);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [callType, setCallType] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData?.id);
    }
  }, []);

  const handleAuthentication = async () => {
    try {
      setError(null);
      await authenticateUser(userId);
    } catch (err) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleMakeCall = async (type) => {
    try {
      setError(null);
      setCallDialed(true);
      await makeCall(calleeId, channelUrl);
      setCallType(type);
    } catch (err) {
      setError("Failed to make call. Please check connection and try again.");
      setCallDialed(false);
      setCallType("");
    }
  };

  const handleHangUp = () => {
    endCall();
    setCallDialed(false);
  };

  // const toggleFullScreen = () => {
  //   const element = document.getElementById("callContainer");
  //   if (!document.fullscreenElement) {
  //     element.requestFullscreen();
  //     setIsFullScreen(true);
  //   } else {
  //     document.exitFullscreen();
  //     setIsFullScreen(false);
  //   }
  // };

  console.log(currentCall, "CURRENT CALL");

  const toggleMute = () => {
    if (currentCall) {
      if (isMuted) {
        currentCall.unmuteMicrophone();
      } else {
        currentCall.muteMicrophone();
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (currentCall) {
      if (isVideoEnabled) {
        currentCall.stopVideo();
      } else {
        currentCall.startVideo();
      }
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Initializing Sendbird...</div>
      </div>
    );
  }

  return (
    <>
      {incomingCall ? (
        <IncomingCall
          incomingCall={incomingCall}
          acceptIncomingCall={acceptIncomingCall}
          declineIncomingCall={declineIncomingCall}
        />
      ) : (
        <>
          <TeamsVideoCall
            noCall={currentCall === null}
            toggleMute={toggleMute}
            toggleVideo={toggleVideo}
            isMuted={isMuted}
            isVideoEnabled={isVideoEnabled}
            handleHangUp={handleHangUp}
          />
        </>
      )}
    </>
  );
}
