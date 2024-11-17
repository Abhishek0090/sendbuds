// app/providers.js
"use client";

import { SENDBIRD_INFO } from "@/constants/constants";
// import "sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import { useSendbird } from "@/context/SendbirdContext";
import { Toaster } from "react-hot-toast";

export default function SendbirdProviderWrapper({ children }) {
  const { loggedInUser } = useSendbird();

  return (
    <SendbirdProvider
      appId={SENDBIRD_INFO}
      userId={loggedInUser?.id}
      nickname={loggedInUser?.nickname}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </SendbirdProvider>
  );
}
