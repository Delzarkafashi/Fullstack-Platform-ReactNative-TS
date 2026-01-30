import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPageContent, PageContentItem } from "../services/pageContentApi";

export default function CareScreen() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getPageContent("care")
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(() => {
        setError("Kunde inte hämta innehåll");
        setItems([]);
      });
  }, []);

  const hero = useMemo(
    () => items.find((x) => !!x.imageUrl) ?? null,
    [items]
  );

  const list = useMemo(() => {
    if (!hero) return items;
    return items.filter((x) => x.id !== hero.id);
  }, [items, hero]);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.pageTitle}>Stöd och omsorg</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {!error && hero && (
        <View style={styles.heroCard}>
          {hero.imageUrl && (
            <Image
              source={{ uri: hero.imageUrl }}
              style={styles.heroImage}
            />
          )}

          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{hero.title}</Text>
            <Text style={styles.heroText}>{hero.excerpt}</Text>
            {hero.content && (
              <Text style={styles.heroText}>{hero.content}</Text>
            )}
          </View>
        </View>
      )}

      {!error && !hero && (
        <Text style={styles.empty}>Inget innehåll ännu</Text>
      )}

      <View style={styles.list}>
        {list.map((item) => {
          const isOpen = openId === item.id;

          return (
            <View key={item.id} style={styles.item}>
              <Pressable
                style={styles.itemHeader}
                onPress={() => setOpenId(isOpen ? null : item.id)}
              >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.excerpt}>{item.excerpt}</Text>
              </Pressable>

              {isOpen && (
                <View style={styles.body}>
                  <Text style={styles.content}>
                    {item.content ?? "Mer information saknas just nu"}
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
    padding: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
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
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 220,
  },
  heroBody: {
    padding: 12,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
    marginBottom: 6,
  },
  list: {
    gap: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  itemHeader: {
    padding: 12,
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
    padding: 12,
    paddingTop: 0,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.95,
  },
});
