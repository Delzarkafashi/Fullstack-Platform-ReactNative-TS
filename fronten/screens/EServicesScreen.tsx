import React, { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPageContent, PageContentItem } from "../services/pageContentApi";

export default function EServicesScreen() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getPageContent("eservices")
      .then(setItems)
      .catch(() => setError("Kunde inte hämta innehåll"));
  }, []);

  const hero = useMemo(() => items.find((x) => !!x.imageUrl) ?? null, [items]);
  const list = useMemo(
    () => items.filter((x) => !hero || x.id !== hero.id),
    [items, hero]
  );

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.pageTitle}>E-tjänster</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {hero && (
        <View style={styles.heroCard}>
          <Image source={{ uri: hero.imageUrl! }} style={styles.heroImage} />
          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{hero.title}</Text>
            <Text style={styles.heroText}>{hero.excerpt}</Text>
            {hero.content && <Text style={styles.heroText}>{hero.content}</Text>}
          </View>
        </View>
      )}

      <View style={styles.list}>
        {list.map((item) => {
          const open = openId === item.id;

          return (
            <View key={item.id} style={styles.item}>
              <Pressable
                style={styles.itemHeader}
                onPress={() => setOpenId(open ? null : item.id)}
              >
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.excerpt}>{item.excerpt}</Text>
              </Pressable>

              {open && (
                <View style={styles.body}>
                  <Text style={styles.content}>{item.content}</Text>
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
    padding: 16 
  },
  pageTitle: { 
    fontSize: 22, 
    fontWeight: "800", 
    marginBottom: 12 
  },
  error: { 
    color: "red", 
    marginBottom: 12 
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
    height: 220 
  },
  heroBody: { 
    padding: 12 
  },
  heroTitle: { 
    fontSize: 18, 
    fontWeight: "800", 
    marginBottom: 6 
  },
  heroText: { 
    fontSize: 14, 
    lineHeight: 20, 
    opacity: 0.9, 
    marginBottom: 6 
  },
  list: { 
    gap: 12 
  },
  item: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  itemHeader: { 
    padding: 12 
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: "800", 
    marginBottom: 6 },
  excerpt: { 
    fontSize: 14, 
    opacity: 0.8 
  },
  body: { 
    padding: 12, 
    paddingTop: 0 
  },
  content: { 
    fontSize: 14, 
    lineHeight: 20 
  },
});
