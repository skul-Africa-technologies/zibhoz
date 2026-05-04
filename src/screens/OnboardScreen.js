import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function OnboardScreen({ onNext }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.center}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>BLOCKCHAIN AI</Text>
          <Text style={styles.logo}>ZIBHOZ</Text>
          <Text style={styles.title}>Voice trading that feels like a premium dashboard</Text>
          <Text style={styles.subtitle}>Monitor markets, speak trades, and keep every signal in one polished space.</Text>
          <Pressable style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Get started</Text>
          </Pressable>
        </View>
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
    backgroundColor: "rgba(255,138,61,0.28)",
  },
  glowBottom: {
    position: "absolute",
    left: -100,
    bottom: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(124,92,255,0.18)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroCard: {
    width: "100%",
    borderRadius: 30,
    padding: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.24,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
    gap: 14,
  },
  kicker: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  logo: {
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: "900",
    lineHeight: 32,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
});
