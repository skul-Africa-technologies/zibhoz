import React, { useState } from "react";
import { Platform } from "react-native";

import OnboardScreen from "./src/screens/OnboardScreen";
import WalletScreen from "./src/screens/WalletScreen";
import MainAppScreen from "./src/screens/MainAppScreen";
import WaitlistScreen from "./src/screens/WaitlistScreen";

const SCREENS = { onboard: "onboard", wallet: "wallet", app: "app" };

function getInitialScreen() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path === "/waitlist") return "waitlist";
  }
  return SCREENS.onboard;
}

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);

  if (screen === "waitlist") {
    return <WaitlistScreen />;
  }

  if (screen === SCREENS.onboard) {
    return <OnboardScreen onNext={() => setScreen(SCREENS.wallet)} />;
  }

  if (screen === SCREENS.wallet) {
    return <WalletScreen onConnect={() => setScreen(SCREENS.app)} />;
  }

  return <MainAppScreen />;
}
