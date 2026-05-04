import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MarketCard({ symbol, price, change }) {
  const isPositive = change >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{symbol.slice(0, 1)}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.label}>Live market</Text>
        </View>
        <View
          style={[
            styles.changePill,
            { backgroundColor: isPositive ? "rgba(72,213,151,0.16)" : "rgba(255,107,107,0.16)" },
          ]}
        >
          <Text style={[styles.change, { color: isPositive ? colors.positive : colors.negative }]}>
            {isPositive ? "+" : ""}{change}%
          </Text>
        </View>
      </View>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconText: {
    color: colors.textPrimary,
    fontWeight: "900",
  },
  meta: {
    flex: 1,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  changePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  price: {
    color: colors.textSecondary,
    marginTop: 14,
    fontSize: 18,
    fontWeight: "800",
  },
  change: {
    fontSize: 12,
    fontWeight: "800",
  },
});
