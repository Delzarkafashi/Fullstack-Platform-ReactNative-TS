import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";

import { getNews, NewsListItem, getNewsBySlug, NewsDetails } from "../services/newsApi";
import type { RootStackParamList } from "../navigation/AppNavigator";

type PoliticsRoute = RouteProp<RootStackParamList, "politics">;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function PoliticsScreen() {
  const route = useRoute<PoliticsRoute>();
  const openSlugFromHome = route.params?.slug;

  const [news, setNews] = useState<NewsListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, NewsDetails>>({});
  const [detailsError, setDetailsError] = useState<string | null>(null);

  useEffect(() => {
    getNews()
      .then((data) => {
        setNews(data);
        setError(null);

        if (openSlugFromHome) {
          setOpenSlug(openSlugFromHome);
        }
      })
      .catch(() => {
        setError("Ingen anslutning till servern");
        setNews([]);
      });
  }, [openSlugFromHome]);

  useEffect(() => {
    if (!openSlug) return;
    if (details[openSlug]) return;

    getNewsBySlug(openSlug)
      .then((d) => {
        setDetails((prev) => ({ ...prev, [openSlug]: d }));
        setDetailsError(null);
      })
      .catch(() => {
        setDetailsError("Kunde inte hämta innehållet");
      });
  }, [openSlug, details]);

  const items = useMemo(() => news, [news]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Kommun och politik</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {!error && items.length === 0 && <Text style={styles.empty}>Inga nyheter</Text>}

      {detailsError && <Text style={styles.error}>{detailsError}</Text>}

      <View style={styles.list}>
        {items.map((item) => {
          const isOpen = openSlug === item.slug;
          const d = details[item.slug];

          return (
            <View key={item.id} style={styles.item}>
              <Pressable
                onPress={() => setOpenSlug(isOpen ? null : item.slug)}
                style={styles.itemHeader}
              >
                <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </Pressable>

              {isOpen && (
                <View style={styles.body}>
                  <Text style={styles.content}>{d ? d.content : "Laddar"}</Text>
                </View>
              )}
            </View>
          );
        })}
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
  error: {
    color: "red",
    marginBottom: 12,
    fontWeight: "700",
  },
  empty: {
    opacity: 0.7,
    marginBottom: 12,
  },
  list: {
    gap: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 12,
    overflow: "hidden",
  },
  itemHeader: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  date: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  body: {
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  content: {
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
  },
});
