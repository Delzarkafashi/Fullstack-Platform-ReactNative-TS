import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ArticleCard from "../components/ArticleCard";
import { getArticles, ArticleListItem } from "../services/articlesApi";

export default function HomeScreen() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
        setError(null);
      })
      .catch(() => {
        setError("Ingen anslutning till servern");
        setArticles([]);
      });
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Startsida</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      {!error && articles.length === 0 && (
        <Text style={styles.empty}>Inga artiklar</Text>
      )}
    <View style={styles.grid}>
      {articles.map((item) => (
      <ArticleCard
        key={item.id}
        id={item.id}
        title={item.title}
        excerpt={item.excerpt}
        imageUrl={item.imageUrl ?? undefined}
        category={item.category}
      />
      ))}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
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
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  list: {
    gap: 16,
  },
});
