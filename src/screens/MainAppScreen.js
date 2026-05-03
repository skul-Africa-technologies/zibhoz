import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

import { MARKETS, CHAT } from "../constants/data";
import colors from "../theme/colors";
import TabBar from "../components/TabBar";
import MarketCard from "../components/MarketCard";
import ChatBubble from "../components/ChatBubble";
import MicButton from "../components/MicButton";

const TABS = ["markets", "chat"];

let _msgCounter = CHAT.length;

export default function MainAppScreen() {
  const [tab, setTab] = useState("markets");
  const [messages, setMessages] = useState(CHAT);

  const handleMicPress = () => {
    _msgCounter += 1;
    setMessages((prev) => [
      ...prev,
      { ...CHAT[0], id: `msg-${_msgCounter}` },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>ZIBHOZ</Text>
      </View>

      <TabBar tabs={TABS} activeTab={tab} onTabChange={setTab} />

      {tab === "markets" && (
        <ScrollView>
          {MARKETS.map((market) => (
            <MarketCard
              key={market.id}
              symbol={market.symbol}
              price={market.price}
              change={market.change}
            />
          ))}
        </ScrollView>
      )}

      {tab === "chat" && (
        <ScrollView>
          {messages.map((message) => (
            <ChatBubble key={message.id} role={message.role} text={message.text} />
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <MicButton onPress={handleMicPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  footer: {
    padding: 12,
    alignItems: "center",
  },
});
