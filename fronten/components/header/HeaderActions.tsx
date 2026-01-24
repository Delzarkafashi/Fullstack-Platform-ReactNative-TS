import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type HeaderActionsProps = {
  onNavigate?: (screen: string) => void;
};

export default function HeaderActions({ onNavigate }: HeaderActionsProps) {
  return (
    <View style={styles.actions}>
      <Pressable style={styles.pillPrimary} onPress={() => onNavigate?.("search")}>
        <Text style={styles.pillPrimaryText}>Sök</Text>
      </Pressable>

      <Pressable style={styles.pillGhost} onPress={() => onNavigate?.("menu")}>
        <Text style={styles.pillGhostText}>Meny</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  pillPrimary: {
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  pillPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  pillGhost: {
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },

  pillGhostText: {
    color: colors.fg,
    fontWeight: "800",
  },
});
