import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";
import SvgIcon from "../components/SvgIcon";

const WALLETS = [
  { id: "phantom", label: "Phantom Wallet", icon: "👻", sub: "Solana-native · Fast setup", tag: "POPULAR" },
  { id: "walletconnect", label: "WalletConnect", icon: "🔗", sub: "Multi-chain · Universal", tag: "MULTI-CHAIN" },
];

const TRUST_ITEMS = [
  { icon: "🛡", text: "Non-custodial" },
  { icon: "🔒", text: "Encrypted" },
  { icon: "✅", text: "Voice-confirmed" },
];

export default function WalletScreen({ onConnect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.center}>
        {/* Lock icon */}
        <View style={styles.lockWrap}>
          <View style={styles.lockRing} />
          <View style={styles.lockOrb}>
              <SvgIcon name="shield" size={32} color={colors.primary} strokeWidth={1.8} />
            </View>
        </View>

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={styles.kicker}>SECURE ACCESS</Text>
          <Text style={styles.title}>Connect your wallet</Text>
          <Text style={styles.subtitle}>
            Pick a wallet provider to unlock voice trading, live markets, and portfolio tracking.
          </Text>
        </View>

        {/* Wallet options */}
        <View style={styles.walletList}>
          {WALLETS.map((wallet) => (
            <Pressable key={wallet.id} style={styles.card} onPress={onConnect}>
              <View style={styles.walletIcon}>
                <Text style={styles.walletEmoji}>{wallet.icon}</Text>
              </View>
              <View style={styles.cardMeta}>
                <Text style={styles.cardLabel}>{wallet.label}</Text>
                <Text style={styles.cardSub}>{wallet.sub}</Text>
              </View>
              <View style={styles.tagPill}>
                <Text style={styles.tagText}>{wallet.tag}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Trust indicators */}
        <View style={styles.trustRow}>
          {TRUST_ITEMS.map((item) => (
            <View key={item.text} style={styles.trustItem}>
              <Text style={styles.trustIcon}>{item.icon}</Text>
              <Text style={styles.trustText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* Safety note */}
        <View style={styles.safetyNote}>
          <Text style={styles.safetyText}>
            Your wallet is never stored on our servers. All transactions require voice confirmation before execution.
          </Text>
        </View>
      </View>
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
    alignSelf: "center",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255,235,59,0.07)",
  },
  glowBottom: {
    position: "absolute",
    left: -80,
    bottom: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 20,
    alignItems: "center",
  },

  // Lock orb
  lockWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  lockRing: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    backgroundColor: "rgba(255,235,59,0.05)",
  },
  lockOrb: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryDim,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  lockIcon: {
    fontSize: 30,
  },

  // Heading
  headingBlock: {
    alignItems: "center",
    gap: 8,
  },
  kicker: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: 14,
    textAlign: "center",
    maxWidth: 300,
    fontWeight: "500",
  },

  // Wallets
  walletList: {
    width: "100%",
    gap: 10,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  walletIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  walletEmoji: {
    fontSize: 24,
  },
  cardMeta: {
    flex: 1,
    gap: 4,
  },
  cardLabel: {
    color: colors.textPrimary,
    fontWeight: "900",
    fontSize: 15,
  },
  cardSub: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
  },
  tagPill: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  // Trust row
  trustRow: {
    flexDirection: "row",
    gap: 0,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    width: "100%",
  },
  trustItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    gap: 4,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  trustIcon: {
    fontSize: 16,
  },
  trustText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Safety note
  safetyNote: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
  },
  safetyText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});

