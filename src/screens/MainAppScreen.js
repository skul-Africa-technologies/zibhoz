import React, { useState, useCallback, useRef } from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView, Pressable } from "react-native";

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

// Quick summary stats shown at top of the main screen
const STATS = [
  { label: "Markets", value: "3", sub: "active" },
  { label: "Volume", value: "$4.4M", sub: "total" },
  { label: "Positions", value: "2", sub: "open" },
];

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

  const sectionTitle = activeTab === "markets" ? "Active Markets" : activeTab === "chat" ? "Voice Assistant" : "My Portfolio";
  const sectionSub = activeTab === "markets" ? "Say a market name to explore" : activeTab === "chat" ? "Conversation history" : "Your open positions";
  const sectionCount = activeTab === "markets" ? MARKETS.length : activeTab === "chat" ? messages.length : PORTFOLIO.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Yellow glow when listening */}
      <View style={[styles.glowTop, voiceState === "listening" && styles.glowTopActive]} />
      <View style={styles.glowBottom} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.brandBlock}>
            <Text style={styles.brand}>ZIBHOZ</Text>
            <Text style={styles.tagline}>Voice-First Prediction Markets</Text>
          </View>
          <View style={[styles.statusPill, { borderColor: voiceStatusColor }]}>
            <View style={[styles.statusDot, { backgroundColor: voiceStatusColor }]} />
            <Text style={[styles.statusText, { color: voiceStatusColor }]}>{voiceStatusLabel}</Text>
          </View>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          {STATS.map((s, i) => (
            <View key={s.label} style={[styles.statCard, i < STATS.length - 1 && styles.statCardBorder]}>
              <Text style={styles.statLabel}>{s.label.toUpperCase()}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        {/* Voice orb hero */}
        <View style={styles.voiceHero}>
          <View style={styles.voiceHeroTop}>
            <View>
              <Text style={styles.voiceHeroTitle}>Voice Control</Text>
              <Text style={styles.voiceHeroSub}>
                {voiceState === "idle"
                  ? "Tap the orb to speak"
                  : voiceState === "listening"
                  ? "Go ahead — I'm listening..."
                  : voiceState === "processing"
                  ? "Fetching market data..."
                  : "Reading response aloud..."}
              </Text>
            </View>
            <Pressable
              style={styles.demoBtn}
              onPress={handleDemoConfirm}
              accessibilityRole="button"
              accessibilityLabel="Preview trade confirmation screen"
            >
              <Text style={styles.demoBtnText}>Demo Trade →</Text>
            </Pressable>
          </View>

          <View style={styles.micCenter}>
            <MicButton onPress={handleMicPress} voiceState={voiceState} />
          </View>
        </View>

        {/* Tabs */}
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{sectionCount}</Text>
            </View>
          </View>
          <Text style={styles.sectionSub}>{sectionSub}</Text>
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
    width: "100%",
    backgroundColor: colors.background,
  },
  glowTop: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,235,59,0.05)",
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
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  content: {
    padding: 18,
    paddingBottom: 48,
    gap: 16,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  brandBlock: {
    gap: 2,
  },
  brand: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 3,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
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
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Stats strip
  statsStrip: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    gap: 2,
  },
  statCardBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  statValue: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
  },
  statSub: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
  },

  // Voice hero
  voiceHero: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 20,
  },
  voiceHeroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  voiceHeroTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  voiceHeroSub: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
    maxWidth: 180,
  },
  demoBtn: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  demoBtnText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  micCenter: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },

  // Section header
  sectionHeader: {
    gap: 3,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
  },
  countBadge: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
  },
  countText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
  },
  sectionSub: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
  },

  // Content
  cardStack: {
    gap: 12,
  },
});