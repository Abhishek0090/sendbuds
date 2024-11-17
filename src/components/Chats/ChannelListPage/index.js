// // import React from "react";
// // import {
// //   GroupChannelListProvider,
// //   useGroupChannelListContext,
// // } from "@sendbird/uikit-react/GroupChannelList";
// // import { GroupChannel } from "@sendbird/chat/groupChannel";

// // // Custom channel preview component
// // const CustomChannelPreview = ({ channel }) => {
// //   return (
// //     <div>
// //       <h3>{channel.name}</h3>
// //       <p>
// //         Last message created:{" "}
// //         {channel.lastMessage?.createdAt || "No messages yet"}
// //       </p>
// //     </div>
// //   );
// // };

// // // Custom channel list component
// // const CustomChannelList = () => {
// //   const { groupChannels, loadMore, onChannelSelect } =
// //     useGroupChannelListContext();

// //   return (
// //     <div>
// //       <h2>My Channels</h2>
// //       {groupChannels.map((channel) => (
// //         <div key={channel.url} onClick={() => onChannelSelect(channel)}>
// //           <CustomChannelPreview channel={channel} />
// //         </div>
// //       ))}
// //       {loadMore && <button onClick={loadMore}>Load More</button>}
// //     </div>
// //   );
// // };

// // // Main component using GroupChannelListProvider
// // const ChannelListPage = () => {
// //   return (
// //     <GroupChannelListProvider>
// //       <CustomChannelList />
// //     </GroupChannelListProvider>
// //   );
// // };

// // export default ChannelListPage;

// "use client";

// import React from "react";
// import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
// import GroupChannelListHeader from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListHeader";
// import { Header } from "@sendbird/uikit-react/ui/Header";
// import Label from "@sendbird/uikit-react/ui/Label";
// import GroupChannelListUI from "@sendbird/uikit-react/GroupChannelList/components/GroupChannelListUI";
// import {
//   MessageBody,
//   MessageHeader,
// } from "@sendbird/uikit-react/ui/MessageContent";
// import { MessageFormItemLayout } from "@sendbird/chat/message";
// import { useSendbirdStateContext } from "sendbird-uikit";
// import GroupChannel from "@sendbird/uikit-react/GroupChannel";
// import {
//   useGroupChannelListContext,
// } from "@sendbird/uikit-react/GroupChannelList/context";

// const ChannelListPage = () => {
//   const { groupChannels, loadMore, onChannelSelect } =
//     useGroupChannelListContext();

//   return (
//     <>
//       <GroupChannelList
//         renderHeader={() => (
//           <GroupChannelListHeader
//             renderLeft={null}
//             renderMiddle={() => (
//               <Header.Title>
//                 <Label type="H1" color="PRIMARY">
//                   "its Lit"
//                 </Label>
//               </Header.Title>
//             )}
//             renderRight={() => (
//               <Header.IconButton
//                 type="INFO"
//                 color="CONTENT"
//                 renderIcon={(props) => (
//                   <Header.Icon
//                     {...props}
//                     width="24px"
//                     height="24px"
//                     onClick={() => {}}
//                   />
//                 )}
//               />
//             )}
//           />
//         )}
//       />
//       <GroupChannel />
//       <MessageHeader message={() => {}} />
//       <MessageBody />
//     </>
//   );
// };

// export default ChannelListPage;

"use client";
import { useState } from "react";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import { useCreateChannelContext } from "@sendbird/uikit-react/CreateChannel/context";
import CustomChannelHeader from "../ChannelHeader";
import { useSendbird } from "@/context/SendbirdContext";
import useCallIntegration from "@/hooks/useCallIntegration";

const ArchivedChannelList = ({ onChannelSelect }) => {
  // Implement logic to fetch and display archived chats here
  return (
    <div>
      <h3>Archived Chats</h3>
      <p>No archived chats yet.</p>
      {/* Replace with actual logic for rendering archived chats */}
    </div>
  );
};

const GroupChannelListPage = () => {
  const { loggedInUser, setCalleeId, authenticateUser } = useSendbird();
  const [activeTab, setActiveTab] = useState("normal"); // 'normal' or 'archived'

  // Handlers for tab switching
  const handleTabChange = (tab) => setActiveTab(tab);

  const [selectedChannelUrl, setSelectedChannelUrl] = useState("");

  // const context = useCreateChannelContext();
  // const context = useGroupChannelContext();

  const handleChannelSelect = (channel) => {
    if (channel && channel.url) {
      const selectedChatUser = channel.members?.find(
        (item) => item?.userId !== loggedInUser?.id
      )?.userId;
      setCalleeId(selectedChatUser);
      setSelectedChannelUrl(channel.url);
    }
  };
  const { renderMessage } = useCallIntegration();

  return (
    <>
      <div className="flex gap-4 w-screen h-full">
        <div className="flex flex-col gap-3">
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <button
              onClick={() => handleTabChange("normal")}
              style={{
                flex: 1,
                padding: "10px",
                background: activeTab === "normal" ? "#007bff" : "#ccc",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Normal Chats
            </button>
            <button
              onClick={() => handleTabChange("archived")}
              style={{
                flex: 1,
                padding: "10px",
                background: activeTab === "archived" ? "#007bff" : "#ccc",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Archived Chats
            </button>
          </div>

          {/* Conditional rendering based on active tab */}
          {activeTab === "normal" ? (
            <GroupChannelList
              onChannelSelect={handleChannelSelect}
              onChannelCreated={handleChannelSelect}
              renderHeader={() => {}}
              renderUserProfile={(user) => console.log(user, "USER")}
            />
          ) : (
            <ArchivedChannelList onChannelSelect={handleChannelSelect} />
          )}
        </div>

        {selectedChannelUrl && (
          <div className="relative flex-1">
            <GroupChannel
              channelUrl={selectedChannelUrl}
              renderChannelHeader={CustomChannelHeader}
              // renderMessage={renderMessage}
              // renderMessageContent={(props) => console.log(props.channel.customType)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default GroupChannelListPage;
