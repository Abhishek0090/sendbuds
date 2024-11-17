import { useSendbirdStateContext } from "@sendbird/uikit-react";

const useCreateChannel = (userId, deliveryPersonId, onCreateChannel) => {
  const { stores } = useSendbirdStateContext();
  const sdk = stores.sdkStore.sdk;

  return async () => {
    if (!sdk || !sdk.groupChannel) {
      console.log("SDK not initialized");
      return;
    }

    const params = {
      invitedUserIds: [userId, ...deliveryPersonId],
      isDistinct: true,
    };

    const channel = await sdk.groupChannel.createChannel(params);
    onCreateChannel(channel.url);
  };
};

export default useCreateChannel;
