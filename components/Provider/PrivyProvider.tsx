"use client";
import React from "react";

import { PrivyProvider as PrivyProviderComponent } from "@privy-io/react-auth";

const PrivyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProviderComponent
      appId="cm6vvv30w01uril3w5z55dore"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        loginMethods: ["email"],
      }}
    >
      {children}
    </PrivyProviderComponent>
  );
};

export default PrivyProvider;
