"use client";
import React, { useState, useEffect } from "react";
import {
  connectUser,
  createSendBirdUser,
  fetchUser,
  createOrGetChannel,
} from "@/utils/sendbird";
import Modal from "@/components/CreateUserModal"; // Modal to create SendBird user
import Chat from "@/components/OldChats"; // Your chat component

const ParentComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [channelUrl, setChannelUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setCurrentUser(parsedUserData);

      const storedChannelUrl = localStorage.getItem("channelUrl");
      setChannelUrl(storedChannelUrl || "");

      fetchUserData(parsedUserData.id);
    } else {
      setShowModal(true);
    }
  }, []);

  // Handle creation of SendBird user
  const handleCreateUser = async (userData) => {
    try {
      // Create the SendBird user
      const user = await createSendBirdUser(
        userData.id,
        userData.nickname,
        userData.avatar
      );

      localStorage.setItem("userData", JSON.stringify(userData));
      const channelUrl = `unique_channel_url_for_${userData.id}_and_user456`; // Example, you may want to generate a real URL
      localStorage.setItem("channelUrl", channelUrl);

      setCurrentUser(userData);
      setChannelUrl(channelUrl);

      setShowModal(false); // Close the modal after user creation
    } catch (error) {
      console.error("Error creating SendBird user:", error);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const user = await fetchUser(userId);
      setCurrentUser(user); // Update the user details if needed
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      {/* {showModal && <Modal onCreateUser={handleCreateUser} />} */}
      <Chat channelUrl={channelUrl} currentUser={currentUser} />
    </div>
  );
};

export default ParentComponent;
