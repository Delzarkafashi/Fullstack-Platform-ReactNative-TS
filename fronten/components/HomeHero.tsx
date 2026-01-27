// components/HomeHero.tsx
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

type HomeHeroProps = {
  title?: string;
  subtitle?: string;
};

export default function HomeHero({
  title = "Välkommen till oss",
  subtitle = "Här samlar vi nyheter, information och aktuella händelser som berör dig.",
}: HomeHeroProps) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../assets/valkommenTillOss.png")}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  image: {
    height: 500,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 16,
  },
  content: {
    alignItems: "center",
    paddingTop: 18,
    paddingRight: 16,
    paddingBottom: 18,
    paddingLeft: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
});
