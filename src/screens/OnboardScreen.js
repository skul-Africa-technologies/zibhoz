import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet, AccessibilityInfo } from "react-native";
import colors from "../theme/colors";
import SvgIcon from "../components/SvgIcon";
import { isVoiceRecognitionSupported, listenForCommand } from "../utils/voiceCommands";
const VOICE_COMMAND_RETRY_DELAY_MS = 900;

const FEATURES = [
  { icon: "voiceOrb", title: "Voice Markets", desc: "Speak to discover & explore markets hands-free" },
  { icon: "shield",   title: "Safe Trades",   desc: "Double-confirmed voice trade execution" },
  { icon: "markets",  title: "Live Portfolio", desc: "Real-time tracking by voice, always" },
];

export default function OnboardScreen({ onNext }) {
  const [listening, setListening] = useState(false);
  const [heardCommand, setHeardCommand] = useState("");
  const stopListeningRef = useRef(null);

  const handleVoiceCommand = useCallback((command) => {
    if (!command) {
      AccessibilityInfo.announceForAccessibility("I didn't catch that. Say continue to move on.");
      return false;
    }
    setHeardCommand(command);
    if (command.includes("continue") || command.includes("next") || command.includes("start")) {
      AccessibilityInfo.announceForAccessibility("Great. Moving to wallet connection.");
      onNext();
      return true;
    }
    AccessibilityInfo.announceForAccessibility("Command not recognized. Say continue to move on.");
    return false;
  }, [onNext]);

  const startVoicePrompt = useCallback(() => {
    if (!isVoiceRecognitionSupported()) return;
    stopListeningRef.current?.();
    setListening(true);
    AccessibilityInfo.announceForAccessibility("Welcome to Zibhoz. Say continue to start wallet setup.");
    stopListeningRef.current = listenForCommand({
      timeoutMs: 5000,
      onResult: (command) => {
        setListening(false);
        const done = handleVoiceCommand(command);
        if (!done) setTimeout(startVoicePrompt, VOICE_COMMAND_RETRY_DELAY_MS);
      },
      onError: () => {
        setListening(false);
        setTimeout(startVoicePrompt, VOICE_COMMAND_RETRY_DELAY_MS);
      },
      onEnd: () => setListening(false),
    });
  }, [handleVoiceCommand]);

  useEffect(() => {
    startVoicePrompt();
    return () => stopListeningRef.current?.();
  }, [startVoicePrompt]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Glow accents */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.center}>

        {/* Soundwave orb */}
        <View style={styles.orbWrap}>
          <View style={styles.orbRing3} />
          <View style={styles.orbRing2} />
          <View style={styles.orbOuter}>
            <View style={styles.orbInner}>
              <SvgIcon name="voiceOrb" size={28} color={colors.textOnYellow} strokeWidth={1.5} />
            </View>
          </View>
        </View>

        {/* Brand */}
        <View style={styles.brandBlock}>
          <Text style={styles.kicker}>VOICE-FIRST PREDICTION MARKETS</Text>
          <Text style={styles.logo}>ZIBHOZ</Text>
          <Text style={styles.tagline}>Trade with your voice.{"\n"}Built for everyone.</Text>
        </View>

        {/* Feature cards */}
        <View style={styles.features}>
          {FEATURES.map((feat) => (
            <View key={feat.title} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <SvgIcon name={feat.icon} size={22} color={colors.primary} strokeWidth={1.8} />
              </View>
              <View style={styles.featureMeta}>
                <Text style={styles.featureTitle}>{feat.title}</Text>
                <Text style={styles.featureDesc}>{feat.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Pressable style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Continue to Wallet →</Text>
        </Pressable>

        <Text style={styles.voiceHint}>
          {isVoiceRecognitionSupported()
            ? listening
              ? "Listening… say “continue”"
              : heardCommand
                ? `Heard: “${heardCommand}”`
                : "Say “continue” to move forward"
            : "Voice recognition unavailable on this device. Use the button above."}
        </Text>
        <Text style={styles.footnote}>No account required · Wallet-powered</Text>
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
    top: -80,
    alignSelf: "center",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(255,235,59,0.09)",
  },
  glowBottom: {
    position: "absolute",
    bottom: -60,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 24,
  },

  // Orb
  orbWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
  },
  orbRing3: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "rgba(255,235,59,0.10)",
  },
  orbRing2: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    backgroundColor: "rgba(255,235,59,0.06)",
  },
  orbOuter: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
    alignItems: "center",
    justifyContent: "center",
  },
  orbInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.65,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  orbIcon: {
    fontSize: 26,
  },

  // Brand
  brandBlock: {
    alignItems: "center",
    gap: 6,
  },
  kicker: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 5,
    color: colors.textPrimary,
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
  },

  // Features
  features: {
    width: "100%",
    gap: 10,
  },
  featureRow: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureMeta: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "900",
  },
  featureDesc: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  },

  // CTA
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 17,
    paddingHorizontal: 52,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    width: "100%",
  },
  buttonText: {
    color: colors.textOnYellow,
    fontWeight: "900",
    fontSize: 17,
    letterSpacing: 0.6,
  },
  footnote: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  voiceHint: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});
