import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function OnboardScreen({ onNext }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Yellow glow — brand identity */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.center}>
        {/* Soundwave orb — logo concept */}
        <View style={styles.orbWrap}>
          <View style={styles.orbOuter}>
            <View style={styles.orbInner}>
              <Text style={styles.orbIcon}>🎙</Text>
            </View>
          </View>
        </View>

        {/* Brand name */}
        <Text style={styles.kicker}>VOICE-FIRST PREDICTION MARKETS</Text>
        <Text style={styles.logo}>ZIBHOZ</Text>
        <Text style={styles.taglineLine}>Trade with your voice.</Text>
        <Text style={styles.taglineLine}>Built for everyone.</Text>

        {/* Feature bullets */}
        <View style={styles.features}>
          {[
            "🔊  Speak to discover & explore markets",
            "✅  Double-confirmed voice trade execution",
            "📊  Real-time portfolio tracking by voice",
          ].map((feat) => (
            <View key={feat} style={styles.featureRow}>
              <Text style={styles.featureText}>{feat}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
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
    top: -80,
    alignSelf: "center",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,235,59,0.10)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -60,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  orbWrap: {
    marginBottom: 8,
  },
  orbOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
    alignItems: "center",
    justifyContent: "center",
  },
  orbInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  orbIcon: {
    fontSize: 32,
  },
  kicker: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  logo: {
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: 4,
    color: colors.textPrimary,
    textAlign: "center",
  },
  taglineLine: {
    fontSize: 22,
    color: colors.textSecondary,
    fontWeight: "700",
    lineHeight: 32,
    textAlign: "center",
  },
  features: {
    width: "100%",
    gap: 10,
    marginTop: 4,
  },
  featureRow: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonText: {
    color: colors.textOnYellow,
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 0.6,
  },
});

