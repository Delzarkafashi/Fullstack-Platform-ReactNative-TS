import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Sök</Text>
      <Text style={styles.intro}>
        Sök efter information, e-tjänster, nyheter och sidor på kommunens webbplats.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Skriv vad du vill söka efter..."
        placeholderTextColor="#888"
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Sökfunktionen kopplas till innehåll och data i ett senare steg.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  intro: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 20,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 16,
  },

  infoBox: {
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    borderRadius: 10,
    opacity: 0.9,
  },

  infoText: {
    fontSize: 13,
    opacity: 0.7,
  },
});
