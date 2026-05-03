import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable key={tab} onPress={() => onTabChange(tab)}>
          <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
            {tab.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  tab: {
    color: colors.textMuted,
    fontWeight: "700",
  },
  activeTab: {
    color: colors.primary,
  },
});
