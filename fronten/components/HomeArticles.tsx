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
        {articles.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("politics")}
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
        ))}
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
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 0,
    overflow: "hidden",
    width: "33.3333%",
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 24,
    paddingLeft: 12,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
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
  },
  excerpt: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
});
