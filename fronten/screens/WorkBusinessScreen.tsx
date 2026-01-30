import React, { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPageContent, PageContentItem } from "../services/pageContentApi";

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString();
}

export default function WorkBusinessScreen() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getPageContent("work")
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError("Kunde inte hämta innehåll");
        setItems([]);
      });
  }, []);

  const hero = useMemo(() => items.find((x) => !!x.imageUrl) ?? null, [items]);
  const list = useMemo(
    () => items.filter((x) => !hero || x.id !== hero.id),
    [items, hero]
  );

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Arbete och näringsliv</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {!error && hero && (
        <View style={styles.heroCard}>
          {hero.imageUrl ? (
            <Image source={{ uri: hero.imageUrl }} style={styles.heroImage} />
          ) : null}

          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{hero.title}</Text>
            {hero.excerpt ? <Text style={styles.heroText}>{hero.excerpt}</Text> : null}
            {hero.content ? <Text style={styles.heroText}>{hero.content}</Text> : null}
          </View>
        </View>
      )}

      {!error && !hero && <Text style={styles.empty}>Inget innehåll ännu</Text>}

      <View style={styles.list}>
        {list.map((item) => {
          const isOpen = openId === item.id;

          return (
            <View key={item.id} style={styles.item}>
              <Pressable
                onPress={() => setOpenId(isOpen ? null : item.id)}
                style={styles.itemHeader}
              >
                {item.publishedAt ? (
                  <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
                ) : null}

                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.excerpt}>{item.excerpt}</Text>
              </Pressable>

              {isOpen && (
                <View style={styles.body}>
                  <Text style={styles.content}>
                    {item.content ? item.content : "Mer info saknas just nu"}
                  </Text>
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
  heroCard: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
  },
  heroImage: {
    width: "100%",
    height: 220,
  },
  heroBody: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroText: {
    fontSize: 14,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 8,
  },
  list: {
    gap: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
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
    marginBottom: 6,
  },
  excerpt: {
    fontSize: 14,
    opacity: 0.8,
  },
  body: {
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
});
