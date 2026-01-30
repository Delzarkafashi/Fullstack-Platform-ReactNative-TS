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

export default function LivingEnvironmentScreen() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getPageContent("living")
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
      <Text style={styles.pageTitle}>Boende, trafik och miljö</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!error && hero ? (
        <View style={styles.heroCard}>
          {hero.imageUrl ? (
            <Image
              source={{ uri: hero.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{hero.title}</Text>

            {hero.excerpt ? (
              <Text style={styles.heroText}>{hero.excerpt}</Text>
            ) : null}

            {hero.content ? (
              <Text style={styles.heroText}>{hero.content}</Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {!error && !hero ? <Text style={styles.empty}>Inget innehåll ännu</Text> : null}

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

              {isOpen ? (
                <View style={styles.body}>
                  <Text style={styles.content}>
                    {item.content ?? "Mer information saknas just nu"}
                  </Text>
                </View>
              ) : null}
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
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
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
