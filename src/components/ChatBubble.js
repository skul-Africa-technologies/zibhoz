import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.ai]}>
      <Text style={[styles.role, isUser && styles.roleUser]}>{isUser ? "YOU" : "ZIBHOZ AI"}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 16,
    borderRadius: 18,
    maxWidth: "86%",
    borderWidth: 1,
    gap: 6,
  },
  user: {
    backgroundColor: colors.primaryDim,
    borderColor: colors.primaryBorder,
    alignSelf: "flex-end",
  },
  ai: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    alignSelf: "flex-start",
  },
  role: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  roleUser: {
    color: colors.primary,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
});

