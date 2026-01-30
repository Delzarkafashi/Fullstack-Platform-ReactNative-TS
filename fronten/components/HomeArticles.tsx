import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { ArticleListItem } from "../services/articlesApi";
import { colors } from "../theme/colors";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  articles: ArticleListItem[];
  error: string | null;
};

function norm(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function pickScreen(category: string): keyof RootStackParamList {
  const c = norm(category);

  if (c.includes("vatten") || c.includes("avlopp") || c.includes("va")) return "living";
  if (c.includes("trafik") || c.includes("vag") || c.includes("väg") || c.includes("parkering")) return "living";
  if (c.includes("politik") || c.includes("kommun") || c === "politics") return "politics";
  if (c.includes("skola") || c.includes("utbild") || c === "school") return "school";
  if (c.includes("omsorg") || c.includes("stod") || c.includes("stöd") || c === "care") return "care";
  if (c.includes("fritid") || c.includes("uppleva") || c.includes("gora") || c.includes("göra") || c === "leisure") return "leisure";
  if (c.includes("bo") || c.includes("miljo") || c.includes("miljö") || c.includes("bygg") || c === "living") return "living";
  if (c.includes("arbete") || c.includes("jobb") || c === "work") return "work";
  if (c.includes("foretag") || c.includes("företag") || c.includes("naringsliv") || c.includes("näringsliv") || c === "business")return "business";

  return "home";
}

export default function HomeArticles({ articles, error }: Props) {
  const navigation = useNavigation<Nav>();

  return (
    <>
      <Text style={styles.sectionTitle}>Artiklar</Text>

      {error && <Text style={styles.error}>{error}</Text>}
      {!error && articles.length === 0 && (
        <Text style={styles.empty}>Inga artiklar</Text>
      )}

      <View style={styles.grid}>
        {articles.map((item) => {
          const screen = pickScreen(item.category);

          return (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => navigation.navigate(screen, { articleId: item.id } as any)}
            >
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              ) : null}

              <View style={styles.content}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.excerpt} numberOfLines={3}>
                  {item.excerpt}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 8,
  },

  error: {
    color: "red",
    marginBottom: 12,
    fontWeight: "700",
  },

  empty: {
    opacity: 0.7,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    maxWidth: 720,
    alignSelf: "center",
    width: "100%",
  },

  card: {
    flexGrow: 1,
    flexBasis: 200,
    maxWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 150,
  },

  content: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 14,
    paddingLeft: 12,
  },

  category: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
    color: colors.fg,
    lineHeight: 22,
  },

  excerpt: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
});
