// app/providers.tsx
"use client";

import { SENDBIRD_INFO } from "@/constants/constants";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import SendbirdCall from "sendbird-calls";
import { DirectCall } from "sendbird-calls";

const SendbirdContext = createContext();

export function useSendbird() {
  const context = useContext(SendbirdContext);
  if (!context) {
    throw new Error("useSendbird must be used within a SendbirdProvider");
  }
  return context;
}

export function SendbirdProvider({ children }) {
  //CALL
  const [initialized, setInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [calleeId, setCalleeId] = useState("");

  //CHAT
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [channelUrl, setChannelUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setLoggedInUser(parsedUserData);
      const storedChannelUrl = localStorage.getItem("channelUrl");
      setChannelUrl(storedChannelUrl || "");
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const APP_ID = SENDBIRD_INFO;
    if (!APP_ID) {
      console.error("Sendbird App ID not found");
      return;
    }

    const init = async () => {
      try {
        await SendbirdCall.init(APP_ID);
        setInitialized(true);

        SendbirdCall.addListener("INCOMING_CALL", {
          onRinging: (call) => {
            handleIncomingCall(call);
          },
        });

        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
          const parsedUserData = JSON.parse(savedUser);
          await authenticateUser(parsedUserData?.id);
        }
      } catch (error) {
        console.error("Failed to initialize Sendbird:", error);
      }
    };

    init();

    return () => {
      SendbirdCall.removeAllListeners();
    };
  }, []);

  const handleIncomingCall = (call) => {
    console.log("Incoming call", call?.callee, call?.caller);
    if (call.callee?.userId === currentUser) {
      call.onEnded = () => {
        setIncomingCall(null);
        setCurrentCall(null);
      };
    } else {
      setIncomingCall(call);
    }
  };

  const acceptParams = {
    callOption: {
      localMediaView: document.getElementById("localVideo"),
      remoteMediaView: document.getElementById("remoteVideo"),
      audioEnabled: true,
      videoEnabled: true,
    },
  };
  const acceptIncomingCall = async () => {
    if (!incomingCall) return;

    try {
      const acceptedCall = await incomingCall.accept(acceptParams);
      console.log("Call accepted:", acceptedCall);

      // Set the current call before setting up media streams
      setCurrentCall(incomingCall);
      setIncomingCall(null);

      // Handle remote media stream
      incomingCall.onRemoteMediaStreamReceived = (stream) => {
        const remoteVideo = document.getElementById("remoteVideo");
        if (remoteVideo) {
          remoteVideo.srcObject = stream;
          remoteVideo.play().catch((error) => {
            console.error("Error playing remote video:", error);
          });
        }
      };

      // Handle local media stream
      incomingCall.onLocalMediaStreamPublished = (stream) => {
        const localVideo = document.getElementById("localVideo");
        if (localVideo) {
          localVideo.srcObject = stream;
          localVideo.play().catch((error) => {
            console.error("Error playing local video:", error);
          });
        }
      };

      // Set up media views explicitly
      incomingCall.setLocalMediaView(document.getElementById("localVideo"));
      incomingCall.setRemoteMediaView(document.getElementById("remoteVideo"));

      // Monitor call state
      incomingCall.onEnded = () => {
        setCurrentCall(null);

        // Clean up video elements
        const localVideo = document.getElementById("localVideo");
        const remoteVideo = document.getElementById("remoteVideo");
        if (localVideo) localVideo.srcObject = null;
        if (remoteVideo) remoteVideo.srcObject = null;
      };
    } catch (error) {
      console.error("Failed to accept call:", error);
      setIncomingCall(null);
      throw error;
    }
  };

  // const acceptIncomingCall = async () => {
  //   if (!incomingCall) return;

  //   try {
  //     const acceptedCall = await incomingCall.accept(acceptParams);
  //     console.log(incomingCall, "ACCEPT");
  //     setCurrentCall(incomingCall);
  //     setIncomingCall(null);

  //     incomingCall.onRemoteMediaStreamReceived = (stream) => {
  //       const remoteVideo = document.getElementById("remoteVideo");
  //       remoteVideo.srcObject = stream;
  //       remoteVideo.play();
  //     };

  //     incomingCall.onLocalMediaStreamPublished = (stream) => {
  //       const localVideo = document.getElementById("localVideo");
  //       localVideo.srcObject = stream;
  //       localVideo.play();
  //     };

  //     incomingCall.onNetworkQualityChanged = (call) => {
  //       console.log(
  //         "Network quality changed",
  //         incomingCall.getNetworkQuality(),
  //         call
  //       );
  //     };
  //   } catch (error) {
  //     console.error("Failed to accept call:", error);
  //     setIncomingCall(null);
  //     throw error;
  //   }
  // };

  const declineIncomingCall = (call) => {
    incomingCall.end();
    setIncomingCall(null);
  };

  const acceptCall = async () => {
    if (!incomingCall) return;

    try {
      const acceptedCall = await incomingCall.accept();
      const localMedia = await SendbirdCall.createLocalMediaStream();
      await acceptedCall.startVideo(localMedia);
      setCurrentCall(acceptedCall);
      setIncomingCall(null);

      call.setLocalMediaView(document.getElementById("localVideo"));
      call.setRemoteMediaView(document.getElementById("remoteVideo"));
    } catch (error) {
      console.error("Failed to accept call:", error);
    }
  };

  const declineCall = async () => {
    if (!incomingCall) return;

    try {
      await incomingCall.end();
      setIncomingCall(null);
    } catch (error) {
      console.error("Failed to decline call:", error);
    }
  };

  const authenticateUser = async (userId) => {
    try {
      await SendbirdCall.authenticate({
        userId: userId,
        accessToken: null,
      });

      await SendbirdCall.connectWebSocket();
      setIsConnected(true);
      setCurrentUser(userId);
      console.log("Connected as user:", userId);
    } catch (error) {
      console.error("Authentication failed:", error);
      setIsConnected(false);
      setCurrentUser(null);
      throw error;
    }
  };

  // console.log(isConnected, "IS CONNECTIONs");

  const makeCall = async (calleeId, channelUrl) => {
    if (!isConnected) {
      throw new Error(
        "WebSocket connection not established. Please authenticate first."
      );
    }

    try {
      const dialParams = {
        userId: calleeId,
        isVideoCall: true,
        callOption: {
          localMediaView: document.getElementById("localVideo"),
          remoteMediaView: document.getElementById("remoteVideo"),
          audioEnabled: true,
          videoEnabled: true,
        },
        holdActiveCall: true,
        sendBirdChatOptions: {
          channelUrl: channelUrl,
        },
      };

      const call = await SendbirdCall.dial(dialParams);
      setCurrentCall(call);

      call.onEnded = () => {
        setCurrentCall(null);
      };

      call.onRemoteMediaStreamReceived = (stream) => {
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = stream;
        remoteVideo.play();
      };

      call.onLocalMediaStreamPublished = (stream) => {
        const localVideo = document.getElementById("localVideo");
        localVideo.srcObject = stream;
        localVideo.play();
      };

      call.onActive = () => {
        console.log("Call is active");
      };

      call.onHold = () => {
        console.log("Call is on hold");
      };

      call.onResume = () => {
        console.log("Call is resumed");
      };

      call.onRemoteAudioSettingsChanged = (call) => {
        console.log("Remote audio settings changed:", call);
      };

      call.onRemoteVideoSettingsChanged = (call) => {
        console.log("Remote video settings changed:", call);
      };

      call.onCameraSwitch = (call) => {
        console.log("Camera switch:", call);
      };

      call.onNetworkQualityChanged = (call) => {
        console.log("Network quality changed:", call);
      };

      call.onActiveSpeakerChanged = (call) => {
        console.log("Active speaker changed:", call);
      };

      call.onCallStatsUpdated = (call) => {
        console.log("Call stats updated:", call);
      };

      call.setLocalMediaView(document.getElementById("localVideo"));
      call.setRemoteMediaView(document.getElementById("remoteVideo"));
    } catch (error) {
      console.error("Failed to make call:", error);
      throw error;
    }
  };

  const endCall = async () => {
    if (currentCall) {
      await currentCall.end();
      setCurrentCall(null);
    }
  };

  return (
    <SendbirdContext.Provider
      value={{
        initialized,
        isConnected,
        currentCall,
        currentUser,
        incomingCall,
        authenticateUser,
        makeCall,
        endCall,
        acceptCall,
        declineCall,
        acceptIncomingCall,
        declineIncomingCall,
        loggedInUser,
        setLoggedInUser,
        channelUrl,
        showModal,
        setShowModal,
        showChannelModal,
        setShowChannelModal,
        setCalleeId,
        calleeId,
      }}
    >
      {children}
    </SendbirdContext.Provider>
  );
}
