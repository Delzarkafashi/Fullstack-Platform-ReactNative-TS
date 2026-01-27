import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";


type Nav = NativeStackNavigationProp<RootStackParamList>;

type SearchItem = {
  id: string;
  title: string;
  description?: string;
  screen: keyof RootStackParamList;
  keywords: string[];
};

function norm(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");

  const items = useMemo<SearchItem[]>(
    () => [
      {
        id: "home",
        title: "Startsida",
        description: "Tillbaka till startsidan",
        screen: "home",
        keywords: ["start", "startsida", "hem", "home", "kommunen"],
      },

      {
        id: "translate",
        title: "Translate",
        description: "Byt språk",
        screen: "translate",
        keywords: ["translate", "sprak", "språk", "english", "engelska", "svenska"],
      },

      {
        id: "contact",
        title: "Kontakt",
        description: "Kontakt och öppettider",
        screen: "contact",
        keywords: [
          "kontakt",
          "kontaktcenter",
          "telefon",
          "mail",
          "e post",
          "epost",
          "oppettider",
          "öppettider",
          "adress",
          "hitta",
        ],
      },

      {
        id: "e-services",
        title: "E tjänster",
        description: "E tjänster och blanketter",
        screen: "e-services",
        keywords: [
          "e tjanster",
          "e tjänster",
          "etjanster",
          "e tjänst",
          "blanketter",
          "blankett",
          "ansokan",
          "ansökan",
          "formular",
          "formulär",
          "bankid",
          "bank id",
          "e tjanster med bankid",
          "e tjänster med bankid",
        ],
      },

      {
        id: "school",
        title: "Förskola och utbildning",
        description: "Förskola, skola och utbildning",
        screen: "school",
        keywords: [
          "forskola",
          "förskola",
          "skola",
          "grundskola",
          "gymnasium",
          "gymnasieskola",
          "vuxenutbildning",
          "utbildning",
          "maten i forskola och skola",
          "maten i förskola och skola",
          "skolmat",
          "skolskjuts",
          "busskort",
        ],
      },

      {
        id: "leisure",
        title: "Uppleva och göra",
        description: "Fritid, aktiviteter och besök",
        screen: "leisure",
        keywords: [
          "uppleva",
          "gora",
          "göra",
          "fritid",
          "aktiviteter",
          "evenemang",
          "se och gora",
          "se och göra",
          "besok",
          "besök",
          "karta",
          "kartor",
        ],
      },

      {
        id: "care",
        title: "Omsorg och stöd",
        description: "Omsorg, stöd och hjälp",
        screen: "care",
        keywords: [
          "omsorg",
          "stod",
          "stöd",
          "hjälp",
          "hemtjanst",
          "hemtjänst",
          "bistand",
          "bistånd",
          "ekonomiskt bistand",
          "ekonomiskt bistånd",
          "tillganglighet",
          "tillgänglighet",
          "lattlast",
          "lättläst",
          "wcag",
        ],
      },

      {
        id: "living",
        title: "Bygga och bo",
        description: "Boende, miljö och bygg",
        screen: "living",
        keywords: [
          "bygga",
          "bo",
          "boende",
          "miljo",
          "miljö",
          "bo och miljo",
          "bo och miljö",
          "bygglov",
          "bostad",
          "trafik",
        ],
      },

      {
        id: "status",
        title: "Status",
        description: "Drift och störningar",
        screen: "status",
        keywords: [
          "status",
          "drift",
          "storning",
          "störning",
          "avbrott",
          "drift och storningar",
          "drift och störningar",
        ],
      },

      {
        id: "work",
        title: "Arbete och lediga jobb",
        description: "Jobb och arbetsliv",
        screen: "work",
        keywords: [
          "arbete",
          "jobb",
          "lediga jobb",
          "anstallning",
          "anställning",
          "cv",
          "rekrytering",
        ],
      },

      {
        id: "business",
        title: "Företag",
        description: "Företag och näringsliv",
        screen: "business",
        keywords: [
          "foretag",
          "företag",
          "naringsliv",
          "näringsliv",
          "starta foretag",
          "starta företag",
          "tillstand",
          "tillstånd",
        ],
      },

      {
        id: "politics",
        title: "Kommun och politik",
        description: "Politik och beslut",
        screen: "politics",
        keywords: [
          "politik",
          "kommun",
          "kommun och politik",
          "beslut",
          "namnd",
          "nämnd",
          "fullmaktige",
          "fullmäktige",
        ],
      },

      {
        id: "visit",
        title: "Besök",
        description: "Besök och info",
        screen: "visit",
        keywords: [
          "besok",
          "besök",
          "hitta",
          "adress",
          "parkering",
          "kartor",
          "karta",
          "framtidsstaden",
        ],
      },

      {
        id: "map",
        title: "Karta",
        description: "Karta och platser",
        screen: "map",
        keywords: ["karta", "kartor", "hitta", "plats", "parkering"],
      },

      {
        id: "accessibility",
        title: "Tillgänglighet",
        description: "Tillgänglighet och lättläst",
        screen: "accessibility",
        keywords: [
          "tillganglighet",
          "tillgänglighet",
          "wcag",
          "lattlast",
          "lättläst",
          "hjälpmedel",
          "kontrast",
          "textstorlek",
          "textstorlek",
        ],
      },
    ],
    []
  );

  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return [];

    return items
      .filter((item) => {
        const titleMatch = norm(item.title).includes(q);
        const descMatch = item.description ? norm(item.description).includes(q) : false;
        const keywordMatch = item.keywords.some((k) => norm(k).includes(q));
        return titleMatch || descMatch || keywordMatch;
      })
      .slice(0, 30);
  }, [items, query]);

  function go(screen: keyof RootStackParamList) {
    navigation.navigate(screen);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Sök</Text>
      <Text style={styles.intro}>Sök efter sidor och funktioner på kommunens webbplats.</Text>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Skriv t ex politik, kontakt, e tjänster"
        placeholderTextColor="#888"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {query.trim().length === 0 ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Tips: prova att skriva politik, skola, omsorg, jobb, e tjänster, skolskjuts eller
            tillgänglighet.
          </Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Inga träffar. Prova ett annat ord.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable style={styles.result} onPress={() => go(item.screen)}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              {item.description ? <Text style={styles.resultDesc}>{item.description}</Text> : null}
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 24,
    paddingLeft: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  intro: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 20,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },

  list: {
    paddingTop: 6,
    gap: 10,
  },

  result: {
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    backgroundColor: "#FFFFFF",
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  resultDesc: {
    fontSize: 13,
    opacity: 0.75,
  },

  infoBox: {
    paddingTop: 14,
    paddingRight: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.03)",
  },

  infoText: {
    fontSize: 13,
    opacity: 0.7,
  },
});
