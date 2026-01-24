import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function HomeScreen() {
  const rows = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => `Rad ${i + 1}  weweaweaweeaweawewe`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Startsida</Text>

      <View style={styles.box}>
        {rows.map((line) => (
          <Text key={line} style={styles.text}>
            {line}
          </Text>
        ))}
      </View>
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

  box: {
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 8,
  },

  text: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 10,
  },
});
