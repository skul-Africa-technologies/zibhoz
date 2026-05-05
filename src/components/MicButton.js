import React, { useEffect, useRef } from "react";
import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import colors from "../theme/colors";

// voiceState: "idle" | "listening" | "processing" | "speaking"
export default function MicButton({ onPress, voiceState = "idle" }) {
  const pulse = useRef(new Animated.Value(1)).current;
  const outerPulse = useRef(new Animated.Value(1)).current;

  const isListening = voiceState === "listening";
  const isProcessing = voiceState === "processing";
  const isSpeaking = voiceState === "speaking";
  const isActive = isListening || isSpeaking;

  useEffect(() => {
    let animation;
    if (isListening) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.12, duration: 600, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      const outerAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(outerPulse, { toValue: 1.35, duration: 900, useNativeDriver: true }),
          Animated.timing(outerPulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      );
      animation.start();
      outerAnim.start();
      return () => {
        animation.stop();
        outerAnim.stop();
        pulse.setValue(1);
        outerPulse.setValue(1);
      };
    } else if (isSpeaking) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 400, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0.96, duration: 400, useNativeDriver: true }),
        ])
      );
      animation.start();
      return () => {
        animation.stop();
        pulse.setValue(1);
      };
    } else {
      pulse.setValue(1);
      outerPulse.setValue(1);
    }
  }, [voiceState, pulse, outerPulse, isListening, isSpeaking]);

  const stateLabel = {
    idle: "Tap to speak",
    listening: "Listening...",
    processing: "Thinking...",
    speaking: "Speaking...",
  }[voiceState];

  const orbColor = isActive ? colors.primary : colors.surface;
  const orbBorder = isActive ? colors.primaryBorder : colors.borderStrong;
  const iconColor = isActive ? colors.textOnYellow : colors.textPrimary;

  return (
    <View style={styles.wrapper}>
      {/* Outer glow ring — only when listening */}
      {isListening && (
        <Animated.View
          style={[
            styles.outerRing,
            { transform: [{ scale: outerPulse }] },
          ]}
        />
      )}

      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          voiceState === "idle"
            ? "Activate microphone to speak"
            : `Voice state: ${voiceState}`
        }
        accessibilityHint="Double tap to start or stop voice input"
      >
        <Animated.View
          style={[
            styles.orb,
            { backgroundColor: orbColor, borderColor: orbBorder, transform: [{ scale: pulse }] },
            isProcessing && styles.processingOrb,
          ]}
        >
          <Text
            style={[styles.icon, { color: iconColor }]}
            accessibilityElementsHidden
            importantForAccessibility="no"
          >
            {isProcessing ? "⟳" : isSpeaking ? "◉" : "🎙"}
          </Text>
        </Animated.View>
      </Pressable>

      <Text style={[styles.label, isActive && styles.labelActive]} accessibilityLiveRegion="polite">
        {stateLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 12,
  },
  outerRing: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: colors.primaryBorder,
    backgroundColor: colors.primaryGlow,
    top: -15,
  },
  orb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  processingOrb: {
    borderStyle: "dashed",
    opacity: 0.85,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  labelActive: {
    color: colors.primary,
  },
});

