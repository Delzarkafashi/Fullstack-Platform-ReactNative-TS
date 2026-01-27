import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ArticleCard from "../components/ArticleCard";
import { getArticles, ArticleListItem } from "../services/articlesApi";

import { getNews, NewsListItem } from "../services/newsApi";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList>;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [articlesError, setArticlesError] = useState<string | null>(null);

  const [news, setNews] = useState<NewsListItem[]>([]);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
        setArticlesError(null);
      })
      .catch(() => {
        setArticlesError("Ingen anslutning till servern");
        setArticles([]);
      });
  }, []);

  useEffect(() => {
    getNews()
      .then((data) => {
        setNews(data);
        setNewsError(null);
      })
      .catch(() => {
        setNewsError("Ingen anslutning till servern");
        setNews([]);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Startsida</Text>

      <Text style={styles.sectionTitle}>Nyheter</Text>
      {newsError && <Text style={styles.error}>{newsError}</Text>}

      {!newsError && news.length === 0 && <Text style={styles.empty}>Inga nyheter</Text>}

      <View style={styles.newsList}>
        {news.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate("politics", { slug: item.slug })}
            style={styles.newsRow}
          >
            <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
            <Text style={styles.newsTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Artiklar</Text>
      {articlesError && <Text style={styles.error}>{articlesError}</Text>}

      {!articlesError && articles.length === 0 && <Text style={styles.empty}>Inga artiklar</Text>}

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
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
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
  newsList: {
    gap: 10,
    marginBottom: 6,
  },
  newsRow: {
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 10,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 10,
  },
  newsDate: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 8,
    paddingRight: 4,
    paddingBottom: 8,
    paddingLeft: 4,
  },
});
