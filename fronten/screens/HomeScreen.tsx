import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Startsida</Text>
      <Text style={styles.text}>

      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.fg,
  },

  text: {
    fontSize: 16,
    color: colors.muted,
  },
});
