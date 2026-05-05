import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import colors from "../theme/colors";

// Displayed as a modal overlay before any trade executes.
// Safety requirement: always read out details + require double confirmation.
export default function ConfirmationCard({ visible, trade, onConfirm, onCancel }) {
  if (!trade) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Warning header */}
          <View style={styles.warningBadge}>
            <Text style={styles.warningText}>⚠ CONFIRM TRADE</Text>
          </View>

          {/* Trade summary — large text for low-vision users */}
          <Text style={styles.action}>{trade.action}</Text>
          <Text style={styles.amount}>{trade.amount}</Text>
          <Text style={styles.outcome}>{trade.outcome}</Text>
          <Text style={styles.market}>{trade.market}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.confirmNote}>
            Please listen carefully. This action cannot be undone. Tap CONFIRM to proceed or CANCEL to abort.
          </Text>

          {/* Actions */}
          <Pressable style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>✓  CONFIRM TRADE</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>✕  CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 28,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: 14,
    alignItems: "center",
  },
  warningBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  warningText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
  action: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    textAlign: "center",
  },
  amount: {
    color: colors.primary,
    fontSize: 52,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 60,
  },
  outcome: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },
  market: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
  },
  confirmNote: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  confirmButtonText: {
    color: colors.textOnYellow,
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 0.6,
  },
  cancelButton: {
    width: "100%",
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  cancelButtonText: {
    color: colors.negative,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.6,
  },
});
