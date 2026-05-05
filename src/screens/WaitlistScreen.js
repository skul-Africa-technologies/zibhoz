import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../theme/colors";

const PERKS = [
  { icon: "🎙", title: "Voice-First Trading", desc: "Speak to trade, explore, and track — hands-free" },
  { icon: "⚡", title: "Early Access", desc: "Be first to use AI-powered prediction markets" },
  { icon: "🎁", title: "Founding Member Perks", desc: "Exclusive rewards for early waitlist members" },
];

export default function WaitlistScreen() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Glow accents */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.center}>
        {/* Logo orb */}
        <View style={styles.orbWrap}>
          <View style={styles.orbRing3} />
          <View style={styles.orbRing2} />
          <View style={styles.orbOuter}>
            <View style={styles.orbInner}>
              <Text style={styles.orbIcon}>🎙</Text>
            </View>
          </View>
        </View>

        {/* Brand */}
        <View style={styles.brandBlock}>
          <Text style={styles.kicker}>JOIN THE WAITLIST</Text>
          <Text style={styles.logo}>ZIBHOZ</Text>
          <Text style={styles.tagline}>
            Voice-first prediction markets.{"\n"}Be first in line.
          </Text>
        </View>

        {/* Perks */}
        <View style={styles.perks}>
          {PERKS.map((perk) => (
            <View key={perk.title} style={styles.perkRow}>
              <View style={styles.perkIcon}>
                <Text style={styles.perkEmoji}>{perk.icon}</Text>
              </View>
              <View style={styles.perkMeta}>
                <Text style={styles.perkTitle}>{perk.title}</Text>
                <Text style={styles.perkDesc}>{perk.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Form */}
        {submitted ? (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>You're on the list!</Text>
            <Text style={styles.successDesc}>
              We'll notify you at{" "}
              <Text style={styles.successEmail}>{email.trim()}</Text> when early
              access opens.
            </Text>
          </View>
        ) : (
          <View style={styles.form}>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="your@email.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                if (error) setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
            />
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Reserve My Spot  →</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.footnote}>No spam · Unsubscribe anytime</Text>
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
    right: -80,
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
    gap: 22,
  },

  // Orb
  orbWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
  },
  orbRing3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "rgba(255,235,59,0.10)",
  },
  orbRing2: {
    position: "absolute",
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    backgroundColor: "rgba(255,235,59,0.06)",
  },
  orbOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryDim,
    alignItems: "center",
    justifyContent: "center",
  },
  orbInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: 22,
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
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 5,
    color: colors.textPrimary,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "600",
    lineHeight: 26,
    textAlign: "center",
  },

  // Perks
  perks: {
    width: "100%",
    gap: 8,
  },
  perkRow: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  perkIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  perkEmoji: {
    fontSize: 19,
  },
  perkMeta: {
    flex: 1,
    gap: 2,
  },
  perkTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "900",
  },
  perkDesc: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 17,
  },

  // Form
  form: {
    width: "100%",
    gap: 10,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    width: "100%",
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  inputError: {
    borderColor: colors.negative,
  },
  errorText: {
    color: colors.negative,
    fontSize: 12,
    fontWeight: "600",
    marginTop: -4,
  },
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

  // Success
  successBox: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  successIcon: {
    fontSize: 32,
  },
  successTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  successDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  successEmail: {
    color: colors.textPrimary,
    fontWeight: "700",
  },

  footnote: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
});
