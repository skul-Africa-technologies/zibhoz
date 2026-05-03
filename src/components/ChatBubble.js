import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.ai]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    margin: 10,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  user: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  ai: {
    backgroundColor: colors.surfaceAlt,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.textPrimary,
  },
});
