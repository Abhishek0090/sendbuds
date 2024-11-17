// // // let SendBirdCall = null;

// // // // Check if window is defined to confirm we are on the client side
// // // if (typeof window !== "undefined") {
// // //   SendBirdCall = require("sendbird-calls");
// // //   SendBirdCall.init(process.env.NEXT_PUBLIC_SENDBIRD_CALLS_SENDBIRD_INFO);
// // // }

// // // const sb = new SendBird({ appId: process.env.NEXT_PUBLIC_SENDBIRD_SENDBIRD_INFO });

// // // export const initSendbird = (userId, accessToken) => {
// // //   return new Promise((resolve, reject) => {
// // //     sb.connect(userId, accessToken, (user, error) => {
// // //       if (error) {
// // //         reject(error);
// // //       } else {
// // //         resolve(user);
// // //       }
// // //     });
// // //   });
// // // };

// // // export const initSendbirdCall = (userId, accessToken) => {
// // //   if (SendBirdCall) {
// // //     return SendBirdCall.authenticate({ userId, accessToken });
// // //   }
// // //   return null;
// // // };

// // // export default { sb, SendBirdCall };

// // // utils/sendbird.js
// // // import { SendBirdCall } from "@sendbird/calls";
// // import SendBird from "sendbird";

// // let SendBirdCall = null;
// // let sb = null;

// // // Check if window is defined to confirm we are on the client side
// // if (typeof window !== "undefined") {
// //   SendBirdCall = require("sendbird-calls");

// //   sb = new SendBird({ appId: process.env.NEXT_PUBLIC_SENDBIRD_SENDBIRD_INFO });
// //   SendBirdCall.init(process.env.NEXT_PUBLIC_SENDBIRD_CALLS_SENDBIRD_INFO);
// // }

// // const authenticateUser = async (userId, nickname) => {
// //   return new Promise((resolve, reject) => {
// //     if (!sb) {
// //       reject(new Error("SendBird is not initialized."));
// //       return;
// //     }

// //     // Connect user
// //     sb.connect(userId, (user, error) => {
// //       if (error) {
// //         reject(error);
// //         return;
// //       }

// //       // Update nickname
// //       sb.updateCurrentUserInfo(nickname, null, (response, err) => {
// //         if (err) reject(err);
// //         else resolve(user);
// //       });
// //     });
// //   });
// // };

// // export { sb, SendBirdCall, authenticateUser };
// import SendBird from "sendbird";
// //
// // Initialize SendBird SDK with your App ID
// const sb = new SendBird({ appId: "758359FB-8783-4EB8-A4EC-C03EC97CBCF3" });

// // Function to connect the user
// export const connectUser = async (userId) => {
//   return new Promise((resolve, reject) => {
//     sb.connect(userId, (user, error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(user);
//       }
//     });
//   });
// };

// // Function to create a SendBird user
// export const createSendBirdUser = async (userId, nickname, avatarUrl) => {
//   return new Promise((resolve, reject) => {
//     const userParams = new sb.User();
//     userParams.userId = userId;
//     userParams.nickname = nickname;
//     userParams.profileUrl = avatarUrl;

//     sb.registerUser(userParams, (user, error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(user);
//       }
//     });
//   });
// };

// // Function to fetch a user by their userId
// export const fetchUser = async (userId) => {
//   return new Promise((resolve, reject) => {
//     sb.getUser(userId, (user, error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(user);
//       }
//     });
//   });
// };

// // Create or get a one-on-one channel
// export const createOrGetChannel = async (userId, otherUserId) => {
//   return new Promise((resolve, reject) => {
//     const params = new sb.GroupChannelParams();
//     params.addUserIds([userId, otherUserId]);

//     sb.GroupChannel.createChannel(params, (channel, error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(channel);
//       }
//     });
//   });
// };

// export { sb };

import SendbirdChat from "@sendbird/chat";
import {
  OpenChannelModule,
  SendbirdOpenChat,
} from "@sendbird/chat/openChannel";

import SendBirdCalls from "sendbird-calls";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";
import { SENDBIRD_INFO } from "@/constants/constants";

// let sb = null;

// if (typeof window !== "undefined") {
//   import("sendbird")
//     .then((SendBirdChat) => {
export const sendcall = SendBirdCalls.init(SENDBIRD_INFO);

export const sb = SendbirdChat.init({
  appId: SENDBIRD_INFO,
  localCacheEnabled: true,
  modules: [new GroupChannelModule(), new OpenChannelModule()],
});

// Connect the user
export const connectUser = (userId) => {
  return new Promise((resolve, reject) => {
    sb.connect(userId)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

export const createSendBirdUser = async (userId, nickname, avatarUrl) => {
  try {
    const userUpdateParams = {
      userId: userId,
      nickname: nickname,
      profileUrl: avatarUrl,
    };

    const data = await sb.connect(userId);

    const user = await sb.updateCurrentUserInfo(userUpdateParams);

    await sb.setChannelInvitationPreference(true);

    const accessToken = "";
    // sb.getAccessToken();
    // document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;

    return {
      user: userUpdateParams,
      accessToken: accessToken,
    };
  } catch (error) {
    throw new Error(`Error creating SendBird user: ${error.message}`);
  }
};

export const getUserListQuery = async (userId) => {
  try {
    const userListQuery = sb.createApplicationUserListQuery();

    const users = await userListQuery.next();

    console.log("SEND BIRD ", users);
    return users;
  } catch (error) {
    throw new Error(`Error fetching user list: ${error.message}`);
  }
};

export const createApplicationChannelQuery = async (paramsData) => {
  try {
    const params = {
      invitedUserIds: ["John", "Harry"],
      name: NAME,
      channelUrl: UNIQUE_CHANNEL_URL,
      coverUrl: COVER_URL, // Or .coverImage to upload a cover image file
      operatorUserIds: ["Hoon", "Doo"],
      data: DATA,
      customType: CUSTOM_TYPE,
      isDistinct: IS_DISTINCT,
      // ...
    };
    const channelQuery = sb.groupChannel.createChannel(params);
    const channel = await channelQuery.next();
    return channel;
  } catch (error) {
    throw new Error(`Error fetching channel: ${error.message}`);
  }
};

// export const startCallConfig = async (callType, otherUserId) => {
//   const localVideoElement = document.getElementById("local_video_element_id");
//   const remoteVideoElement = document.getElementById("remote_video_element_id");

//   // Ensure the media elements exist
//   if (!localVideoElement || !remoteVideoElement) {
//     console.error("Video elements not found.");
//     return;
//   }

//   const callOptions = {
//     userId: otherUserId,
//     isVideoCall: callType === "video", // Determine if it's a video call or voice call
//     callOption: {
//       localMediaView: localVideoElement,
//       remoteMediaView: remoteVideoElement,
//       audioEnabled: true,
//       videoEnabled: callType === "video", // Enable video if it's a video call
//     },
//   };

//   try {
//     const call = await SendBirdCalls.dial(callOptions);

//     console.log("Call started:", call);

//     // Set up the call event listeners
//     call.onEstablished = () => {
//       console.log("Call established.");
//     };

//     call.onConnected = () => {
//       console.log("Call connected.");
//     };

//     call.onEnded = () => {
//       console.log("Call ended.");
//       // You can set `isCallActive` to false here to stop the call
//     };

//     call.onRemoteAudioSettingsChanged = (call) => {
//       console.log("Remote audio settings changed:", call);
//     };

//     call.onRemoteVideoSettingsChanged = (call) => {
//       console.log("Remote video settings changed:", call);
//     };

//     // Add more listeners if needed (e.g., for handling ring, connection issues, etc.)
//   } catch (error) {
//     console.error("Error starting call:", error);
//   }
// };

// export const authenticateCallee = async (calleeId, calleeToken) => {
//   // Authenticate the callee
//   await new Promise((resolve, reject) => {
//     SendBirdCalls.authenticate(
//       { userId: calleeId, accessToken: calleeToken },
//       (user, error) => {
//         if (error) {
//           console.error("Error authenticating callee:", error);
//           reject(error);
//         } else {
//           console.log("Authenticated successfully for callee:", user);
//           resolve(user);
//         }
//       }
//     );
//   });
// };

// export const initSendbirdCall = async (userId, accessToken) => {
//   SendBirdCalls.init(SENDBIRD_INFO); // Initialize the SDK

//   SendBirdCalls.setLoggerLevel(SendBirdCalls.LoggerLevel.INFO);

//   const paramsData = {
//     userId,
//     accessToken,
//   };

//   // Authenticate the caller
//   await new Promise((resolve, reject) => {
//     SendBirdCalls.authenticate(paramsData, (user, error) => {
//       if (error) {
//         console.error("Error initializing SendBird Calls for caller:", error);
//         reject(error);
//       } else {
//         console.log("Authenticated successfully for user:", user);
//         resolve(user);
//       }
//     });
//   });

//   // Connect WebSocket after authentication for the caller
//   SendBirdCalls.connectWebSocket()
//     .then(() => console.log("WebSocket connection established."))
//     .catch((err) => console.log("Something went wrong.", err));
// };
