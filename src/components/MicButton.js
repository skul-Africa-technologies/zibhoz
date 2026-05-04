import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MicButton({ onPress }) {
  return (
    <Pressable style={styles.mic} onPress={onPress}>
      <Text style={styles.icon}>🎙</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mic: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: colors.textPrimary,
  },
});
