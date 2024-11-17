"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  GripHorizontal,
  User,
  Expand,
  Shrink,
  X,
} from "lucide-react";
import VideoPlaceholder from "../VideoPlaceholder";
import StatusOverlay from "../StatusOverlay";
import ActionButton from "../ActionButton";

const TeamsVideoCall = ({
  toggleMute,
  toggleVideo,
  isMuted,
  isVideoEnabled,
  handleHangUp,
  noCall,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 700,
    y: window.innerHeight - 600,
  });
  const dragRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (!isDragging && !isFullscreen) {
        setPosition({
          x: window.innerWidth - 720,
          y: window.innerHeight - 400,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDragging, isFullscreen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && dragRef.current && !isFullscreen) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        setPosition((prev) => ({
          x: Math.max(
            0,
            Math.min(
              window.innerWidth - dragRef.current.offsetWidth,
              prev.x + deltaX
            )
          ),
          y: Math.max(
            0,
            Math.min(
              window.innerHeight - dragRef.current.offsetHeight,
              prev.y + deltaY
            )
          ),
        }));

        dragStartPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isFullscreen]);

  const handleDragStart = (e) => {
    if (!isFullscreen) {
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      setPosition({
        x: window.innerWidth - 700,
        y: window.innerHeight - 600,
      });
    }
  };

  return (
    <div
      ref={dragRef}
      style={{
        transform: isFullscreen
          ? "none"
          : `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? "none" : "all 0.3s ease",
      }}
      className={`${noCall ? "hidden" : "fixed"} ${
        isFullscreen
          ? "fixed inset-0 w-full h-full"
          : "fixed transition-all duration-200 w-auto"
      } bg-gray-900 rounded-lg shadow-2xl z-50`}
    >
      {/* Header */}
      <div
        onMouseDown={handleDragStart}
        className="flex items-center justify-between p-2 bg-gray-800 rounded-t-lg cursor-move"
      >
        <div className="flex items-center gap-2">
          <GripHorizontal size={16} className="text-gray-400" />
          <span className="text-white text-sm">Video Call</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            {isFullscreen ? <Shrink size={16} /> : <Expand size={16} />}
          </button>
          {!isFullscreen && (
            <button
              onClick={toggleMinimize}
              className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
          )}
          <button
            onClick={handleHangUp}
            className="p-1 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div
        className={`p-4 ${isMinimized && !isFullscreen ? "hidden" : "block"}`}
      >
        <div className="flex gap-4">
          {/* Main Video */}
          <div className="flex flex-col gap-3 w-full">
            <div
              className={`relative ${
                isFullscreen ? "h-[calc(100vh-8rem)]" : "aspect-video w-[600px]"
              } bg-gray-800 rounded-lg overflow-hidden`}
            >
              {isVideoEnabled ? (
                <video
                  id="remoteVideo"
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <VideoPlaceholder />
              )}
              <StatusOverlay
                isMuted={isMuted}
                isVideoEnabled={isVideoEnabled}
              />

              {/* Local Video */}
              <div className="absolute bottom-4 right-4 w-48 aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {isVideoEnabled ? (
                  <video
                    id="localVideo"
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <User size={32} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  {isMuted && (
                    <div className="bg-red-500 p-1 rounded-full">
                      <MicOff size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex justify-center gap-2 bg-gray-800 rounded-b-lg">
        <ActionButton
          onClick={toggleMute}
          icon={isMuted ? MicOff : Mic}
          color={isMuted ? "bg-red-500" : "bg-gray-600"}
        />
        <ActionButton
          onClick={toggleVideo}
          icon={isVideoEnabled ? Video : VideoOff}
          color={!isVideoEnabled ? "bg-red-500" : "bg-gray-600"}
        />
        <ActionButton
          onClick={handleHangUp}
          icon={PhoneOff}
          color="bg-red-500"
          label="End"
        />
      </div>
    </div>
  );
};

export default TeamsVideoCall;
