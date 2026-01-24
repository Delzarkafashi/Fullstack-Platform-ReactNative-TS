import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type HeaderToolsProps = {
  onNavigate?: (screen: string) => void;
};

export default function HeaderTools({ onNavigate }: HeaderToolsProps) {
  return (
    <View style={styles.tools}>
      <Pressable style={styles.tool}>
        <Text style={styles.toolIcon}>🌐</Text>
        <Text style={styles.toolText}>Translate</Text>
      </Pressable>

      <Pressable style={styles.tool} onPress={() => onNavigate?.("contact")}>
        <Text style={styles.toolIcon}>👤</Text>
        <Text style={styles.toolText}>Kontakt</Text>
      </Pressable>

      <Pressable style={styles.tool} onPress={() => onNavigate?.("e-services")}>
        <Text style={styles.toolIcon}>🗂️</Text>
        <Text style={styles.toolText}>E-tjänster</Text>
      </Pressable>

      <Pressable style={styles.tool} onPress={() => onNavigate?.("business")}>
        <Text style={styles.toolIcon}>🏢</Text>
        <Text style={styles.toolText}>Företag</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tools: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tool: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
  },

  toolIcon: {
    fontSize: 14,
  },

  toolText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.fg,
  },
});
