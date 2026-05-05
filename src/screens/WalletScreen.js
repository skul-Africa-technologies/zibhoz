import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";

const WALLETS = [
  { id: "phantom", label: "Phantom Wallet", icon: "👻", sub: "Solana-native · Fast setup" },
  { id: "walletconnect", label: "WalletConnect", icon: "🔗", sub: "Multi-chain · Universal" },
];

export default function WalletScreen({ onConnect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.center}>
        {/* Lock icon */}
        <View style={styles.lockOrb}>
          <Text style={styles.lockIcon}>🔐</Text>
        </View>

        <Text style={styles.kicker}>SECURE ACCESS</Text>
        <Text style={styles.title}>Connect your wallet</Text>
        <Text style={styles.subtitle}>
          Pick a wallet provider to unlock voice trading, live markets, and portfolio tracking.
        </Text>

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
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Safety note */}
        <View style={styles.safetyNote}>
          <Text style={styles.safetyText}>
            🛡  Your wallet is never stored. All transactions require voice confirmation.
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
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255,235,59,0.08)",
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
    gap: 16,
    alignItems: "center",
  },
  lockOrb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryDim,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  lockIcon: {
    fontSize: 34,
  },
  kicker: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    color: colors.textPrimary,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 24,
    fontSize: 15,
    textAlign: "center",
    maxWidth: 300,
  },
  walletList: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  walletEmoji: {
    fontSize: 22,
  },
  cardMeta: {
    flex: 1,
    gap: 3,
  },
  cardLabel: {
    color: colors.textPrimary,
    fontWeight: "900",
    fontSize: 16,
  },
  cardSub: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
  },
  arrow: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "300",
  },
  safetyNote: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
  },
  safetyText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});

