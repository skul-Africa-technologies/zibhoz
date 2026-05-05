import React, { useState, useCallback, useRef } from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";

import { MARKETS, CHAT, PORTFOLIO } from "../constants/data";
import colors from "../theme/colors";
import TabBar from "../components/TabBar";
import MarketCard from "../components/MarketCard";
import ChatBubble from "../components/ChatBubble";
import MicButton from "../components/MicButton";
import ConfirmationCard from "../components/ConfirmationCard";
import PortfolioCard from "../components/PortfolioCard";

const TABS = ["markets", "chat", "portfolio"];

// Simulate a voice state cycle: idle → listening → processing → speaking → idle
const VOICE_CYCLE = ["idle", "listening", "processing", "speaking", "idle"];

export default function MainAppScreen() {
  const [activeTab, setActiveTab] = useState("markets");
  const [messages, setMessages] = useState(CHAT);
  const [voiceState, setVoiceState] = useState("idle");
  const [confirmTrade, setConfirmTrade] = useState(null);
  const voiceCycleRef = useRef(0);
  const msgCounter = useRef(CHAT.length);

  // Cycles through voice states to simulate voice interaction for demo
  const handleMicPress = useCallback(() => {
    if (voiceState !== "idle") return;

    voiceCycleRef.current = 1;
    setVoiceState("listening");

    // Simulate: listening → processing → speaking → idle
    setTimeout(() => setVoiceState("processing"), 2000);
    setTimeout(() => {
      setVoiceState("speaking");
      // Simulate AI response in chat
      msgCounter.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${msgCounter.current}`,
          role: "ai",
          text: 'BTC market: "Will BTC exceed $100K by June?" — 67% YES, 33% NO. Volume: $2.4M. Would you like to place a trade?',
        },
      ]);
    }, 3500);
    setTimeout(() => setVoiceState("idle"), 6000);
  }, [voiceState]);

  // Show a demo trade confirmation
  const handleDemoConfirm = useCallback(() => {
    setConfirmTrade({
      action: "BUY",
      amount: "$50",
      outcome: "YES",
      market: "Will BTC exceed $100K by June 2025?",
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setConfirmTrade(null);
    msgCounter.current += 1;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${msgCounter.current}`,
        role: "ai",
        text: "✓ Trade confirmed! You bought $50 YES on BTC market. Transaction submitted to blockchain.",
      },
    ]);
  }, []);

  const handleCancel = useCallback(() => {
    setConfirmTrade(null);
    msgCounter.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: `msg-${msgCounter.current}`, role: "ai", text: "Trade cancelled. No funds were moved." },
    ]);
  }, []);

  const voiceStatusLabel = {
    idle: "Ready",
    listening: "Listening",
    processing: "Thinking",
    speaking: "Speaking",
  }[voiceState];

  const voiceStatusColor = voiceState === "idle" ? colors.textMuted : colors.primary;

  return (
    <SafeAreaView style={styles.container}>
      {/* Yellow glow when listening */}
      <View style={[styles.glowTop, voiceState === "listening" && styles.glowTopActive]} />
      <View style={styles.glowBottom} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>ZIBHOZ</Text>
            <Text style={styles.tagline}>Voice-First Prediction Markets</Text>
          </View>
          <View style={[styles.statusPill, { borderColor: voiceStatusColor }]}>
            <View style={[styles.statusDot, { backgroundColor: voiceStatusColor }]} />
            <Text style={[styles.statusText, { color: voiceStatusColor }]}>{voiceStatusLabel}</Text>
          </View>
        </View>

        {/* Voice orb hero */}
        <View style={styles.voiceHero}>
          <View style={styles.micCenter}>
            <MicButton onPress={handleMicPress} voiceState={voiceState} />
          </View>
          <Text style={styles.voiceHint}>
            {voiceState === "idle"
              ? "Tap the orb to speak. Ask about markets, prices, or place a trade."
              : voiceState === "listening"
              ? "Go ahead — I'm listening..."
              : voiceState === "processing"
              ? "Fetching market data..."
              : "Reading response aloud..."}
          </Text>
        </View>

        {/* Demo confirm trade button */}
        <View style={styles.demoRow}>
          <Text
            style={styles.demoBtn}
            onPress={handleDemoConfirm}
            accessibilityRole="button"
            accessibilityLabel="Preview trade confirmation screen"
          >
            Preview Trade Confirmation →
          </Text>
        </View>

        {/* Tabs */}
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeTab === "markets" ? "Active Markets" : activeTab === "chat" ? "Voice Assistant" : "My Portfolio"}
          </Text>
          <Text style={styles.sectionSub}>
            {activeTab === "markets"
              ? "Say a market name to explore"
              : activeTab === "chat"
              ? "Conversation history"
              : "Your open positions"}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.cardStack}>
          {activeTab === "markets" &&
            MARKETS.map((item) => (
              <MarketCard
                key={item.id}
                symbol={item.symbol}
                question={item.question}
                yes={item.yes}
                no={item.no}
                volume={item.volume}
                deadline={item.deadline}
              />
            ))}

          {activeTab === "chat" &&
            messages.map((item) => (
              <ChatBubble key={item.id} role={item.role} text={item.text} />
            ))}

          {activeTab === "portfolio" &&
            PORTFOLIO.map((item) => (
              <PortfolioCard
                key={item.id}
                symbol={item.symbol}
                outcome={item.outcome}
                amount={item.amount}
                pnl={item.pnl}
                status={item.status}
              />
            ))}
        </View>
      </ScrollView>

      {/* Trade confirmation modal */}
      <ConfirmationCard
        visible={!!confirmTrade}
        trade={confirmTrade}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  glowTop: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,235,59,0.06)",
  },
  glowTopActive: {
    backgroundColor: "rgba(255,235,59,0.18)",
  },
  glowBottom: {
    position: "absolute",
    left: -80,
    bottom: 80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  content: {
    padding: 18,
    paddingBottom: 40,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  brand: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },
  tagline: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  voiceHero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: 20,
  },
  micCenter: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 110,
  },
  voiceHint: {
    color: colors.textMuted,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    maxWidth: 280,
  },
  demoRow: {
    alignItems: "flex-end",
  },
  demoBtn: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  sectionHeader: {
    gap: 3,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
  },
  sectionSub: {
    color: colors.textMuted,
    fontSize: 13,
  },
  cardStack: {
    gap: 12,
  },
});