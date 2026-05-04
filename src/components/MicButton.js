import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MicButton({ onPress }) {
  return (
    <Pressable style={styles.mic} onPress={onPress}>
      <View style={styles.innerRing}>
        <Text style={styles.icon}>🎙</Text>
      </View>
      <Text style={styles.label}>Tap to speak</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mic: {
    backgroundColor: colors.primary,
    width: 160,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    gap: 6,
  },
  innerRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7,8,20,0.18)",
  },
  icon: {
    color: colors.textPrimary,
    fontSize: 18,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
