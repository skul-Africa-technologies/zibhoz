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
      <View style={styles.center}>
        <Text style={styles.title}>Connect Wallet</Text>
        {WALLETS.map((wallet) => (
          <Pressable key={wallet.id} style={styles.card} onPress={onConnect}>
            <Text style={styles.cardText}>{wallet.label}</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    width: 220,
  },
  cardText: {
    color: colors.textPrimary,
  },
});
