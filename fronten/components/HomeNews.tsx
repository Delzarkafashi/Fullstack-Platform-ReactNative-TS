import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { NewsListItem } from "../services/newsApi";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  news: NewsListItem[];
  error: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString();
}

export default function HomeNews({ news, error }: Props) {
  const navigation = useNavigation<Nav>();

  return (
    <>
      <Text style={styles.sectionTitle}>Nyheter</Text>

      {error && <Text style={styles.error}>{error}</Text>}
      {!error && news.length === 0 && (
        <Text style={styles.empty}>Inga nyheter</Text>
      )}

      <View style={styles.grid}>
        {news.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => navigation.navigate("politics", { slug: item.slug })}
            style={styles.cell}
          >
            <View style={styles.card}>
              <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
              <Text style={styles.title}>{item.title}</Text>
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
    maxWidth: 720,
    alignSelf: "center",
    width: "100%",
  },

  cell: {
    width: "33.3333%",
    paddingTop: 0,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },

  card: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  date: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
});
