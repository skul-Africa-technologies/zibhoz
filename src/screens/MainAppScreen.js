import React, { useState, useCallback, useRef } from "react";
import { View, SafeAreaView, StyleSheet, Text, ScrollView, Pressable, TextInput } from "react-native";

import { MARKETS, CHAT } from "../constants/data";
import colors from "../theme/colors";
import TabBar from "../components/TabBar";
import MarketCard from "../components/MarketCard";
import ChatBubble from "../components/ChatBubble";
import MicButton from "../components/MicButton";

const TABS = ["markets", "chat"];

export default function MainAppScreen() {
  const [activeTab, setActiveTab] = useState("markets");
  const [messages, setMessages] = useState(CHAT);
  const chatListRef = useRef(null);
  
  // Ref persists the counter across renders without causing re-renders itself
  const msgCounter = useRef(CHAT.length);

  const handleMicPress = useCallback(() => {
    msgCounter.current += 1;
    const newMessage = { 
      ...CHAT[0], 
      id: `msg-${msgCounter.current}`,
      text: "Recording voice command..." // Placeholder for actual logic
    };
    
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const marketChange = MARKETS.reduce((total, market) => total + market.change, 0) / MARKETS.length;
  const marketHealth = marketChange >= 0 ? "Bullish flow" : "Bearish flow";
  const sparkline = [42, 48, 46, 54, 61, 58, 64, 71, 67, 74, 79, 76];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.brand}>ZIBHOZ</Text>
            <Text style={styles.tagline}>Modern voice trading dashboard</Text>
          </View>
          <View style={styles.profilePill}>
            <Text style={styles.profileText}>Live</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value=""
            editable={false}
            placeholder="Search markets, signals, or wallets"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
          <Pressable style={styles.searchAction}>
            <Text style={styles.searchActionText}>Filter</Text>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroLabel}>Market pulse</Text>
              <Text style={styles.heroTitle}>AI trading radar</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{marketHealth}</Text>
            </View>
          </View>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{marketChange.toFixed(1)}%</Text>
              <Text style={styles.heroStatLabel}>Average move</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>24/7</Text>
              <Text style={styles.heroStatLabel}>Signal watch</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>3</Text>
              <Text style={styles.heroStatLabel}>Tracked assets</Text>
            </View>
          </View>

          <View style={styles.chartWrap}>
            {sparkline.map((point, index) => (
              <View
                key={`${point}-${index}`}
                style={[
                  styles.chartBar,
                  {
                    height: 36 + point,
                    backgroundColor: index % 2 === 0 ? colors.primary : colors.accent,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{activeTab === "markets" ? "Top markets" : "Assistant chat"}</Text>
          <Text style={styles.sectionSubTitle}>{activeTab === "markets" ? "Quick scan of active coins" : "Voice-driven trading prompts"}</Text>
        </View>

        <View style={styles.cardStack}>
          {activeTab === "markets"
            ? MARKETS.map((item) => (
                <MarketCard
                  key={item.id}
                  symbol={item.symbol}
                  price={item.price}
                  change={item.change}
                />
              ))
            : messages.map((item) => (
                <ChatBubble key={item.id} role={item.role} text={item.text} />
              ))}
        </View>

        <View style={styles.micWrap}>
          <MicButton onPress={handleMicPress} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundGlowTop: {
    position: "absolute",
    top: -90,
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,138,61,0.28)",
  },
  backgroundGlowBottom: {
    position: "absolute",
    left: -110,
    bottom: 130,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(124,92,255,0.2)",
  },
  content: {
    padding: 18,
    paddingBottom: 32,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  brand: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  tagline: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 13,
  },
  profilePill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileText: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: "700",
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    paddingVertical: 0,
  },
  searchAction: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
  },
  searchActionText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 4,
    gap: 16,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  heroLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 4,
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(72,213,151,0.12)",
    borderWidth: 1,
    borderColor: "rgba(72,213,151,0.18)",
  },
  heroBadgeText: {
    color: colors.positive,
    fontSize: 12,
    fontWeight: "800",
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: 10,
  },
  heroStat: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroStatValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
  },
  heroStatLabel: {
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },
  chartWrap: {
    height: 150,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartBar: {
    width: 14,
    borderRadius: 999,
    opacity: 0.9,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
  },
  sectionSubTitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  cardStack: {
    gap: 12,
  },
  micWrap: {
    alignItems: "center",
    marginTop: 8,
  },
});