import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type HeaderBrandProps = {
  onNavigate?: (screen: string) => void;
  title?: string;
  markText?: string;
  compact?: boolean;
};

export default function HeaderBrand({
  onNavigate,
  title = "Kommunen",
  markText = "K",
  compact = false,
}: HeaderBrandProps) {
  return (
    <Pressable style={styles.brand} onPress={() => onNavigate?.("home")}>
      <View style={[styles.brandMark, compact && styles.brandMarkCompact]}>
        <Text style={styles.brandMarkText}>{markText}</Text>
      </View>

      {!compact ? <Text style={styles.brandText}>{title}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandMark: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  brandMarkCompact: {
    width: 34,
    height: 34,
  },

  brandMarkText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  brandText: {
    color: colors.fg,
    fontSize: 18,
    fontWeight: "800",
  },
});
