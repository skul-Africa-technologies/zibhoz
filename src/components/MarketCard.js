import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MarketCard({ symbol, price, change }) {
  return (
    <View style={styles.card}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={[styles.change, { color: change > 0 ? colors.positive : colors.negative }]}>
        {change}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    margin: 10,
    padding: 16,
    borderRadius: 12,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  change: {
    fontSize: 12,
  },
});
