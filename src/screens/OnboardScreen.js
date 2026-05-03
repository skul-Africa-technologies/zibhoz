import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function OnboardScreen({ onNext }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.logo}>ZIBHOZ</Text>
        <Text style={styles.title}>Voice Trading AI</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  title: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 12,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
});
