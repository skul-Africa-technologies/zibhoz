import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";

const WALLETS = [
  { id: "phantom", label: "Phantom Wallet" },
  { id: "walletconnect", label: "WalletConnect" },
];

export default function WalletScreen({ onConnect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.center}>
        <View style={styles.headerCard}>
          <Text style={styles.kicker}>SECURE ACCESS</Text>
          <Text style={styles.title}>Connect your wallet</Text>
          <Text style={styles.subtitle}>Pick a provider to unlock live trading, signals, and portfolio tracking.</Text>
        </View>
        {WALLETS.map((wallet) => (
          <Pressable key={wallet.id} style={styles.card} onPress={onConnect}>
            <Text style={styles.cardText}>{wallet.label}</Text>
            <Text style={styles.cardMeta}>Fast setup</Text>
          </Pressable>
        ))}
      </View>
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
    top: -70,
    right: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,138,61,0.22)",
  },
  glowBottom: {
    position: "absolute",
    left: -100,
    bottom: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(124,92,255,0.16)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
    marginBottom: 8,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    color: colors.textPrimary,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    color: colors.textPrimary,
    fontWeight: "800",
  },
  cardMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
