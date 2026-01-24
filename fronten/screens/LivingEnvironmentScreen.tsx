import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LivingEnvironmentScreen() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Boende, trafik och miljö</Text>
      <Text style={styles.text}>Tom sida. Innehåll byggs i Sprint 3.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    paddingTop: 24, 
    paddingRight: 16, 
    paddingBottom: 24, 
    paddingLeft: 16 
},
  title: { 
    fontSize: 22, 
    fontWeight: "800", 
    marginBottom: 10 
},
  text: { 
    fontSize: 14, 
    opacity: 0.8 
},
});
