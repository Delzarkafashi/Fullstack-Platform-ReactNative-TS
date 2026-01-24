import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ContactScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Kontakt</Text>
      <Text style={styles.intro}>
        Här hittar du kontaktuppgifter, öppettider och information om hur du kommer i
        kontakt med kommunen.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kontaktcenter</Text>
        <Text style={styles.text}>Telefon: 013 00 00 00</Text>
        <Text style={styles.text}>E-post: info@kommun.se</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Öppettider</Text>
        <Text style={styles.text}>Måndag–fredag: 08.00–16.30</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Snabblänkar</Text>

        <Pressable>
          <Text style={styles.link}>Felanmälan</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.link}>E-tjänster</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.link}>Kartor och besök</Text>
        </Pressable>
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

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.85,
  },

  link: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },
});
