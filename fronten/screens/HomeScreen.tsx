import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import HomeHero from "../components/HomeHero";
import HomeNews from "../components/HomeNews";
import HomeArticles from "../components/HomeArticles";

import { getArticles, ArticleListItem } from "../services/articlesApi";
import { getNews, NewsListItem } from "../services/newsApi";

export default function HomeScreen() {
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

      <HomeHero />

      <HomeNews news={news} error={newsError} />

      <HomeArticles articles={articles} error={articlesError} />
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
});
