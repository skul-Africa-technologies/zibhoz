import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.ai]}>
      <Text style={styles.role}>{isUser ? "YOU" : "AI"}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 18,
    maxWidth: "86%",
    borderWidth: 1,
    borderColor: colors.border,
  },
  user: {
    backgroundColor: "rgba(255,138,61,0.18)",
    alignSelf: "flex-end",
  },
  ai: {
    backgroundColor: colors.surfaceAlt,
    alignSelf: "flex-start",
  },
  role: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  text: {
    color: colors.textPrimary,
    lineHeight: 20,
  },
});
