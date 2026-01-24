import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type HeaderBrandProps = {
  onNavigate?: (screen: string) => void;
  title?: string;
  markText?: string;
};

export default function HeaderBrand({
  onNavigate,
  title = "Kommunen",
  markText = "K",
}: HeaderBrandProps) {
  return (
    <Pressable style={styles.brand} onPress={() => onNavigate?.("home")}>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>{markText}</Text>
      </View>
      <Text style={styles.brandText}>{title}</Text>
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
