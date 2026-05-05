import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onTabChange(tab)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text style={[styles.tab, isActive && styles.activeTab]}>
              {tab.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    padding: 6,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 13,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tab: {
    color: colors.textMuted,
    fontWeight: "800",
    letterSpacing: 1,
    fontSize: 12,
  },
  activeTab: {
    color: colors.textOnYellow,
  },
});

