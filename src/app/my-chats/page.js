"use client";

import CallInterface from "@/components/Call";
import GroupChannelListPage from "@/components/Chats/ChannelListPage";
import CreateChannelModal from "@/components/CreateChannelModal";
import CreateUserModal from "@/components/CreateUserModal";
import { useSendbird } from "@/context/SendbirdContext";
import {
  connectUser,
  createApplicationChannelQuery,
  createSendBirdUser,
  getUserListQuery,
} from "@/utils/sendbird";
import { CreateChannelProvider } from "@sendbird/uikit-react/CreateChannel/context";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import { GroupChannelListProvider } from "@sendbird/uikit-react/GroupChannelList/context";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "sendbird-uikit/dist/index.css";

const ChatPage = () => {
  // State for managing user and call status
  // loggedInUser,
  // channelUrl,
  // showModal,
  // setShowModal
  const {
    loggedInUser,
    channelUrl,
    setChannelUrl,
    showModal,
    setShowModal,
    setShowChannelModal,
    showChannelModal,
    setLoggedInUser,
  } = useSendbird();

  const [user, setUser] = useState(null);

  const [AccessToken, setAccessToken] = useState(
    document.coookie?.accessToken || ""
  );

  useEffect(() => {
    connectUser(loggedInUser?.id)
      .then((userData) => {
        console.log("handleInputChange");
        setUser(userData);
        getUsers();
      })
      .catch((error) => {
        console.error("Error connecting user:", error);
      });
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const { user, accessToken } = await createSendBirdUser(
        userData.id,
        userData.nickname,
        userData.avatar
      );

      localStorage.setItem("userData", JSON.stringify(userData));
      // const channelUrl = `unique_channel_url_for_${userData.id}_and_user456`;
      // localStorage.setItem("channelUrl", channelUrl);

      setLoggedInUser(userData);
      // setChannelUrl(channelUrl);
      // setAccessToken(accessToken);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating SendBird user:", error);
    }
  };

  const handleChannelModal = () => {
    setShowChannelModal(true);
  };

  const handleCreateChannel = async (data) => {
    try {
      const channel = await createApplicationChannelQuery(data);
    } catch (error) {
      console.error("Error creating SendBird channel:", error);
    }
  };

  const [userData, setUserData] = useState([]);

  const getUsers = async () => {
    try {
      const users = await getUserListQuery();

      console.log("user", users);
      toast.success("User Fetched Successfully");
      setUserData(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Something went wrong while fetching user");
    }
  };

  const router = useRouter();

  console.log(showChannelModal, "SHOW CHANNEL");

  return (
    <div className="h-screen w-full">
      <div className="flex justify-between p-4 gap-4">
        <div className="flex gap-3">
          <button
            className="btn btn-1 px-4 py-2 text-white bg-orange-500 rounded-md"
            onClick={() => setShowModal(true)}
          >
            Create User
          </button>
          <button
            className="btn btn-2 px-4 py-2 text-white bg-orange-500 rounded-md"
            onClick={handleChannelModal}
          >
            Create Channel
          </button>
        </div>
      </div>
      <main>
        <CallInterface />
      </main>

      <div className=" h-[500px]">
        {/* SendBird UIKit */}
        {/* <SendbirdApp
          appId={SENDBIRD_INFO}
          userId={currentUser?.id}
          config={{
            enableVideo: true,
            enableAudio: true,
            enableFileTransfer: true,
            enableNotification: true,
            enableMessageList: true,
          }}
          // accessToken={TEMP_TOKEN}
          allowProfileEdit={false}
          colorSet={{
            "--sendbird-light-primary-500": "#066858",
          }}
          nickname={currentUser?.nickname}
          showSearchIcon
        /> */}
        <GroupChannelProvider>
          <GroupChannelListProvider>
            <CreateChannelProvider>
              <GroupChannelListPage />
            </CreateChannelProvider>
          </GroupChannelListProvider>
        </GroupChannelProvider>
      </div>

      <CreateUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreateUser={handleCreateUser}
      />
      <CreateChannelModal
        isOpen={showChannelModal}
        onClose={() => setShowChannelModal(false)}
        userData={userData}
        handleSubmit={handleCreateChannel}
      />
    </div>
  );
};

export default ChatPage;
